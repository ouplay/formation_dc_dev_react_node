const express = require("express");
const app = express();

const session = require("express-session");

const bcrypt = require('bcrypt');

const connect = require("./connection.js");
const config = require("./config.js");

const cors = require("cors");
const { ObjectId } = require("mongodb");

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const verifySession = (req, res, next) => {
  if (req.session.loggedIn === true) {
    console.log("Logged in, you can proceed")
    next()
  } else {
    res.status(403);
    console.log("You must be authenticated to proceed")
    res.send("You must be authenticated")
  }
}

app.use(session({secret:'Keep it secret'
,name:'uniqueSessionID'
,saveUninitialized:false}));

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", verifySession, function (req, res) {
  res.send(req.session.savedDocuments);
});

app.get("/tasks", verifySession, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});

app.post("/tasks", verifySession, async (req, res, next) => {
  console.log("insertion");

  console.log("body : ", req.body);

  try {
    let { db_client, db_connection } = await connect();

    db_connection
      .collection("tasks")
      .insertOne(req.body)
      .then((result) => {
        console.log("result : ", result);
        res.send(result.insertedId);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    res.status(500);
    res.send("Server Error");
  }
});

app.post("/tasks/:id", verifySession, async (req, res, next) => {
  console.log("update");
  console.log(req.params.id);
  console.log(req.body);

  try {
    let { db_client, db_connection } = await connect();

    let result = await db_connection.collection("tasks").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: req.body,
      }
    );
    if (result.matchedCount === 0) {
      next({ code: 400, message: "No task was updated, id doesn't exist" });
    } else {
      res.send("ok");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send("Server error");
  }
});

app.delete("/tasks/many/:status", verifySession, async (req, res, next) => {
  let { db_client, db_connection } = await connect();

  console.log("many");

  try {
    let filter;

    if (req.params.status === "pending") {
      filter = { done: false };
    } else if (req.params.status === "is-done") {
      filter = { done: true };
    } else if (req.params.status === "all") {
      filter = {};
    } else {
      throw new Error("Operation does not exist");
    }

    db_connection
      .collection("tasks")
      .find(filter)
      .toArray(async (err, documentsToBeDeleted) => {
        if (err) return next(err);

        console.log(documentsToBeDeleted);

        req.session.savedDocuments = documentsToBeDeleted;

        console.log(req.session);
        console.log(req.session.savedDocuments);

        let result = await db_connection.collection("tasks").deleteMany(filter);
      });

    res.send("ok");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.delete("/tasks/one/:id", verifySession, async (req, res, next) => {
  console.log("one");

  let { db_client, db_connection } = await connect();

  try {
    let result = await db_connection
      .collection("tasks")
      .deleteOne({ _id: ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      next({ code: 400, message: "No task was deleted" });
    } else {
      res.send("ok");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/auth/signup", async (req, res) => {
  let newUser = req.body;

  try {
    let { db_client, db_connection } = await connect();

    try {
      let user = await db_connection
        .collection("users")
        .findOne({ username: newUser.username });

      if (user) {
        throw new Error("User already exists");
      }

      newUser.password = await bcrypt.hash(newUser.password, 10)

      await db_connection.collection("users").insertOne(newUser);

      res.send("User successfuly signed up");
      console.log("singup ok")

    } catch (err) {
      res.status(400);
      res.send(err.message)
      console.log(err.message)

    }
  } catch (err) {
    res.status(500);
    console.log("Server error")
    res.send("Server error");
  }
});

app.post("/auth/login", async (req, res) => {

  try {
    const loginData = req.body;
  
    let { db_client, db_connection } = await connect();

    let user = await db_connection.collection("users").findOne({username: loginData.username});
    try {
      if(!user) {
        throw new Error("Invalid username");
      }


      const samePassword = await bcrypt.compare(loginData.password, user.password);

      if(!samePassword) {
        throw new Error("Invalid password")
      }

      req.session.username = user.username;
      req.session.loggedIn = true;

      res.send("Logged in");

    } catch(err) {
      res.status(403);
      console.log(err.message);
      res.send("Invalid credentials")
    }

  } catch(err) {
    res.status(500);
    res.send("Server error");
  }


})

app.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      res.status(500);
      res.send("An error occured while logging out")
    } else {
      res.send("Logged out")
    }
  })
})

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`);
});
