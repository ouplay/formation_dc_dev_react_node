
require('dotenv').config()
require('./persistence/connection').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

let connect = require("./persistence/connection.js")

const express = require('express')
const app = express()

app.use(express.json())

const noteRouter = require('./route/note')
app.use('/', noteRouter)


app.listen(process.env.PORT)
