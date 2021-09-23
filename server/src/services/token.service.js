const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const Token = require('../models/token.model');
const bcrypt = require('bcrypt')

class TokenService {
    async generateTokens(payload) {
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRE })
        const accessToken = await this.generateAccessToken(payload, refreshToken)
        return {
            accessToken,
            refreshToken
        }
    }

    async generateAccessToken(payload, refreshToken) {
        console.log()
        const hash = await bcrypt.hash(refreshToken, 3);
        const accessToken = jwt.sign({ ...payload, refreshToken: hash }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRE })
        return 'Bearer ' + accessToken
    }

    async saveToken(userId, refreshToken) {
        const user = await User.findOne({ where: { pk: userId } })
        const tokenData = await user.getToken()

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({ refreshToken })
        await token.setUser(user)
        return token;
    }

    validateAccessToken(token) {
        try {
            // console.log(jwt.decode())
            const userData = jwt.verify(token, process.env.ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } })
        return token;
    }

    async removeToken(refreshToken) {
        const token = await this.findToken(refreshToken)
        if (token) {
            const destroy = await token.destroy()
            return { destroy }
        }
        return { destroy: {}, message: "Token has already been destroyed." }

    }

    async userValidateRefreshToken(userData) {
        try {
            const user = await User.findOne({ where: { pk: userData.pk } })
            const token = await user.getToken()
            const compare = await bcrypt.compare(token.refreshToken, userData.refreshToken)
            if (compare) {
                return token;
            }

            return null
        }
        catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService