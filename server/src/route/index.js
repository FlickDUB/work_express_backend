const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression')
const authController = require("../controllers/auth.controller");

const authMiddleware = require('../middlewares/auth.middleware')
const errorMiddleware = require("../middlewares/error.middleware");

const app = express()
const filesRoute = require('./files.route')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression())
app.use(cors())
app.use(helmet())

app.use('/file', authMiddleware, filesRoute)

app.post('/signup',authController.registration)
app.get('/api', authMiddleware, (req, res) => {
    res.send('api is secured!')
})
app.post('/signin/new_token', authController.refresh)
app.post('/signin', authController.login)
app.post('/logout', authController.logout)
app.get('/info', authMiddleware, (req, res) => {
    const { pk, id } = req.user
    res.json({ pk, id })
})

app.use(errorMiddleware)


module.exports = app