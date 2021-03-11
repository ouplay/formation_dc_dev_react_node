const { ObjectId } = require("bson");
var express = require("express");
var app = express();
var router = express.Router();
let connect = require("../connection.js");

router.get("/", async (req, res) => {
  let { db_client, db_connection } = await connect();

  db_connection
    .collection("lists")
    .find({})
    .toArray((err, result) => {
      if (err) return console.log(err);

      console.log("todo :", result);

      db_client.close();
      res.send(result);
    });
});

router.get("/:id", async (req, res) => {
  let { db_client, db_connection } = await connect();

  const result = await db_connection
    .collection("lists")
    .findOne({ _id: ObjectId(req.params.id) });

  console.log("todo :", result);

  db_client.close();
  res.send(result);
});

router.post("/:id", async (req, res) => {
  let { db_client, db_connection } = await connect();

  console.log("body: ", req.body);

  if(req.body._id) {
      delete req.body._id;
  }

  const result = await db_connection
    .collection("lists")
    .replaceOne({ _id: ObjectId(req.params.id) }, req.body);

  console.log("todo :", result);

  db_client.close();
  res.send(result);
});

router.post("/", async (req, res) => {
  let { db_client, db_connection } = await connect();

  db_connection
    .collection("todo")
    .find({})
    .toArray((err, result) => {
      if (err) return console.log(err);

      console.log("todo :", result);

      db_client.close();
      res.send(result);
    });
});

module.exports = router;
