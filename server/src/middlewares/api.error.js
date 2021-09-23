module.exports = class ApiError extends Error {
    constructor(status, message, errors = [], relogin = false) {
        super(message);
        this.status = status;
        this.errors = errors;
        if (relogin) {
            this._relogin = relogin
        }
    }

    static UnauthorizedError(relogin = true) {
        return new ApiError(401, 'User is not logged in', [], relogin)
    }

    static BadRequest(message, errors = [], relogin = false) {
        return new ApiError(400, message, errors, relogin);
    }
}
