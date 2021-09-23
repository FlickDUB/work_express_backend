const ApiError = require('../middlewares/api.error');
const { ValidationError } = require('yup')

module.exports = function (err, req, res, next) {
    console.log('///\n', err);
    if (err instanceof ApiError) {
        console.log('relogin?:', err._relogin)
        let errors = err.errors?.length ? err.errors : [{ msg: err.message }]
        let result = { message: err.message, errors }
        if (err._relogin) {
            result._relogin = err._relogin
        }
        return res.status(err.status || 400).json(result)
    }
    let errors = err.errors ? err.errors : ['Unknown error']
    if (err instanceof ValidationError) {
        let errors = err.errors?.length ? err.errors : [{ msg: err.message }]
        const result = { message: err.errors[0], errors }
        return res.status(400).json(result)
    }
    let message = { message: 'Unknown error', errors }
    return res.status(500).json(message)

};
