const express = require("express");
const app = express();

let connect = require("./connection.js");
let config = require("./config.js");

const cors = require("cors");
const { ObjectId } = require("mongodb");

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json())

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/tasks", async (req, res) => {
  let { db_client, db_connection } = await connect();

  db_connection
    .collection("tasks")
    .find({})
    .toArray((err, result) => {
      if (err) return console.log(err);

      console.log("tasks :", result);

      db_client.close();
      res.send(result);
    });
});

app.post("/tasks", async (req, res, next) => {
  console.log("insertion");

  console.log("body : ", req.body);

  let { db_client, db_connection } = await connect();

  db_connection
    .collection("tasks")
    .insertOne(req.body)
    .then(() => {
      res.send("ok");
    })
    .catch((err) => {
      next(err)
    });
});


app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`);
});
