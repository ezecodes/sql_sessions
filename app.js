const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const {register, login} = require('./src/controllers/auth')

app.use(express.json())
app.use(cookieParser())

app.use('/register', register)
app.use('/login', login)

module.exports = app