const express = require('express');
const router = express.Router();
const multer = require('multer')
const multerUpdateMiddleware = require("../middlewares/multerUpdate.middleware")
const filesController = require("../controllers/files.controller");

const upload = multer({ dest: process.env.UPLOAD_PATH })


router.post('/upload', upload.single('file'), filesController.upload)
router.put('/update/:id', multerUpdateMiddleware, filesController.updateFile)
router.get('/list', filesController.listFiles)
router.get('/download/:id', filesController.dowloadFile)
router.get('/:id', filesController.fileInfo)

module.exports = router