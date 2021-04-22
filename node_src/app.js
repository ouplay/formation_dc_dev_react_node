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

app.post("/tasks/:id",  async (req, res, next) => {

  console.log("update");
  console.log(req.params.id)
  console.log(req.body)

  let { db_client, db_connection } = await connect();

   try {
     let result = await db_connection
     .collection("tasks")
     .updateOne(
       {_id: ObjectId(req.params.id)},
       {
        $set: req.body
       }
      ) 
     if(result.matchedCount === 0) {
       next({code: 400, message: "No task was updated, id doesn't exist"})
     } else {
       res.send("ok")
     }
   } catch(err) {
     console.log(err);
     next(err)
   }
})

app.delete("/tasks/",  async (req, res, next) => {
  let { db_client, db_connection } = await connect();

   try {
     let result = await db_connection
     .collection("tasks")
     .deleteMany({})
 
     res.send("ok")
   } catch(err) {
     console.log(err);
     next(err)
   }
})



app.delete("/tasks/many/:status",  async (req, res, next) => {
  let { db_client, db_connection } = await connect();


  console.log("many")

   try {

    let filter;

    if(req.params.status === "pending") {
      filter = {done: false};
    } else if(req.params.status === "is-done") {
      filter = {done: true};
    } else if(req.params.status === "all") {
      filter = {};
    } else {
      throw new Error("Operation does not exist")
    }

     let result = await db_connection
     .collection("tasks")
     .deleteMany(filter)
 
     res.send("ok")
   } catch(err) {
     console.log(err);
     next(err)
   }
})


app.delete("/tasks/one/:id",  async (req, res, next) => {
  console.log("one")

   let { db_client, db_connection } = await connect();

    try {
      let result = await db_connection
      .collection("tasks")
      .deleteOne({_id: ObjectId(req.params.id)})
  
      if(result.deletedCount === 0) {
        next({code: 400, message: "No task was deleted"})
      } else {
        res.send("ok")
      }
    } catch(err) {
      console.log(err);
      next(err)
    }
})




app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`);
});
