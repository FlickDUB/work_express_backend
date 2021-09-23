const multer = require("multer");
const filesService = require("../services/files.service");
const idParam = require('../validators/idParam.validator')


module.exports = async function (req, res, next) {
    await idParam.validate(req.params, { abortEarly: false })

    const candidateFile = await filesService.findFile(req.params.id)

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.env.UPLOAD_PATH)
        },
        filename: function (req, file, cb) {
            cb(null, candidateFile.name)
        }
    })
    const upload = multer({ storage }).single('file')
    upload(req, res, next)
}

