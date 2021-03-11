
const express = require('express')
const app = express()

let config = require("./config.js")

var cors = require('cors')

const todoRouter = require('./routers/todo.js');

var corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', function (req, res) {
  res.send("Bienvenue sur l'api Todo");
})

app.use('/todo', todoRouter);


app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

