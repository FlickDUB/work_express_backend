const userService = require('../services/user.service')
const yup = require('yup')

const userCredentialsSchema = yup.object().shape({
    id: yup.string().test('is-email-or-phone', 'Enter Valid Phone/Email',
        function (value) {
            const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            const phoneRegex = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // Change this regex based on requirement
            let isValidEmail = emailRegex.test(value);
            let isValidPhone = phoneRegex.test(value);
            if (!isValidEmail && !isValidPhone) {
                return false;
            }
            return true;
        }, 'id must be phone or email!').required(),
    password: yup.string().min(6).max(32).required(),
});


class AuthController {
    async registration(req, res, next) {
        try {
            await userCredentialsSchema.validate(req.body, { abortEarly: false })
            let { id, password } = req.body;
            id = id.replace('+', '')
            const userData = await userService.signup(id, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            await userCredentialsSchema.validate(req.body, { abortEarly: false })
            let { id, password } = req.body;
            id = id.replace('+', '')
            const userData = await userService.login(id, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshtoken } = req.headers;
            const userData = await userService.refresh(refreshtoken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshtoken } = req.headers;
            const result = await userService.logout(refreshtoken)

            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController