const filesService = require("../services/files.service");
const idParam = require('../validators/idParam.validator')
const fileRequired = require('../validators/fileRequired.validator')
const yup = require('yup');
const listQuerySchema = yup.object().shape({
    list_size: yup.number().min(1, 'list_size min value 1.').max(100, 'list_size max value 100.'),
    page: yup.number().min(1, 'page min value 1.'),
});

const ApiError = require('../middlewares/api.error');

class FilesController {
    async upload(req, res, next) {
        try {
            await fileRequired.validate(req, { abortEarly: false })

            let originalname = req.file.originalname
            let extension = filesService.getFileExtension(originalname)
            const fileData = { ...req.file, extension }

            const file = await filesService.createFile(fileData)
            res.json(file)
        } catch (e) {
            next(e)
        }
    }

    async listFiles(req, res, next) {
        try {
            let { list_size = 10, page = 1 } = req.query
            list_size = parseInt(list_size)
            page = parseInt(page)
            await listQuerySchema.validate({ list_size, page }, { abortEarly: false })

            let files = await filesService.listFiles((page - 1) * list_size, list_size)
            files = files.map(el => {
                const { id, originalname, name } = el
                return { id, originalname, name }
            })
            res.json(files)
        } catch (e) {
            next(e)
        }
    }

    async dowloadFile(req, res, next) {
        try {
            await idParam.validate(req.params, { abortEarly: false })
            const file = await filesService.findFile(req.params.id);
            const filePath = 'uploads/' + file.name

            res.download(filePath, file.originalname)
        } catch (e) {
            next(e)
        }
    }

    async fileInfo(req, res, next) {
        try {
            await idParam.validate(req.params, { abortEarly: false })

            const file = await filesService.findFile(req.params.id);
            res.json(file.toJSON())
        } catch (e) {
            next(e)
        }
    }

    async updateFile(req, res, next) {
        try {
            let id = req.params.id

            await fileRequired.validate(req, { abortEarly: false })

            const file = await filesService.findFile(id);

            let extension = filesService.getFileExtension(req.file.originalname)
            const { originalname, mimetype: type, size } = req.file
            const updatedFile = await file.update({ originalname, type, size, extension })
            res.json(updatedFile)

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FilesController