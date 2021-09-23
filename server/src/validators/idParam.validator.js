const yup = require('yup')

module.exports = yup.object().shape({
    id: yup.string().required('id param is required!')
})