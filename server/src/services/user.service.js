const bcrypt = require('bcrypt')

const User = require('../models/user.model')
const Token = require('../models/token.model')
const tokenService = require('./token.service')
const ApiError = require('../middlewares/api.error')


class UserService {
    async signup(id, password) {
        const candidate = await User.findOne({ where: { id } })
        if (candidate) {
            throw ApiError.BadRequest('User already exist!')
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            id,
            password: hashedPass,
        })

        const tokens = await tokenService.generateTokens({ pk: user.pk, id: user.id })
        const token = await Token.create({ refreshToken: tokens.refreshToken })
        await token.setUser(user)

        return { pk: user.pk, id: user.id, ...tokens }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError(true);
        }
        const user = await User.findOne({ where: { pk: userData.pk } });
        const accessToken = await tokenService.generateAccessToken({ pk: user.pk, id: user.id }, tokenFromDb.refreshToken);

        return { pk: user.pk, id: user.id, accessToken }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw new ApiError(401, 'Refresh token is empty!');
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async login(id, password) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest('User is not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const tokens = await tokenService.generateTokens({ pk: user.pk, id: user.id });;
        await tokenService.saveToken(user.pk, tokens.refreshToken);

        return { pk: user.pk, id: user.id, ...tokens }
    }
}

module.exports = new UserService