const yup = require('yup')

module.exports = yup.object().shape({
    file: yup.object().required('file is required!')
})