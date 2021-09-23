// const mimeDb = require('mime-db')

const ApiError = require("../middlewares/api.error");
const File = require("../models/file.model");

class FilesService {
    getFileExtension(data) {
        // get file extension
        const indexExt = data.lastIndexOf('.')
        return indexExt >= 0 ? data.substring(indexExt + 1, data.length) : null;
        // return mimeDb[mimetype]
    }

    async createFile(payload) {
        const { originalname, filename: name, extension, mimetype: type, size } = payload
        const file = await File.create({
            originalname, name, extension, type, size
        })
        return file
    }

    async listFiles(offset, limit) {
        const files = await File.findAll({ offset, limit })
        return files
    }

    async findFile(id) {
        const file = await File.findOne({ where: { name: id } })
        if (!file) {
            throw ApiError.BadRequest('File not found!')
        }
        return file
    }



    // async getDownloadPath(id) {

    // }
}

module.exports = new FilesService