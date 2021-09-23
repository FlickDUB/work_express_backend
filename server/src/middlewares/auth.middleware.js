const tokenService = require('../services/token.service');
const ApiError = require('./api.error');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }


        const refreshToken = await tokenService.userValidateRefreshToken(userData)
        if (!refreshToken) {
            return next(ApiError.UnauthorizedError('Access token is not relevant'));
        }

        req.user = userData;

        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
