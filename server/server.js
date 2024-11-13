const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productivedb",
});

app.get("/", (req, res) => {
  return res.json("From server");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getDoneDates", (req, res) => {
  const sql =
    "SELECT Tasks.Task_id, Tasks.User_id, doneDates.Task_doneDate FROM Tasks JOIN doneDates ON Tasks.Task_id = doneDates.Task_id";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Wrong email/password" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (Username, Password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Database error: " + err.message });
      }

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send({ message: "User registered successfully" });
      } else {
        return res
          .status(400)
          .send({ message: "User could not be registered" });
      }
    }
  );
});

app.post("/getUsersTasks", (req, res) => {
  const User_id = req.body.User_id;

  db.query(
    "SELECT * FROM Tasks WHERE User_id = ?",
    [User_id],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/addDoneDate", (req, res) => {
  const Task_id = req.body.Task_id;
  const TodaysDate = req.body.TodaysDate;

  db.query(
    "INSERT INTO doneDates (Task_id, Task_doneDate) VALUES (?, ?)",
    [Task_id, TodaysDate],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/deleteDoneDate", (req, res) => {
  const Task_id = req.body.Task_id;
  const TodaysDate = req.body.TodaysDate;

  db.query(
    "DELETE FROM doneDates WHERE Task_id = ? AND Task_doneDate = ?",
    [Task_id, TodaysDate],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/updateTask", (req, res) => {
  const newTaskTitle = req.body.newTaskTitle;
  const Task_id = req.body.Task_id;

  db.query(
    "UPDATE tasks SET Task_title = ? WHERE Task_id = ?",
    [newTaskTitle, Task_id],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.affectedRows > 0) {
        return res.send({ message: "Task updated successfully" });
      } else {
        return res.send({ message: "Task not found or no changes made" });
      }
    }
  );
});

app.post("/removeAllDoneDates", (req, res) => {
  const Task_id = req.body.Task_id;

  db.query(
    "DELETE FROM doneDates WHERE Task_id = ?",
    [Task_id],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/removeTask", (req, res) => {
  const Task_id = req.body.Task_id;

  db.query("DELETE FROM Tasks WHERE Task_id = ?", [Task_id], (err, result) => {
    if (err) {
      return res.send({ err: err });
    }

    if (result.length > 0) {
      return res.send(result);
    } else {
      return res.send({ message: "Bad request" });
    }
  });
});

app.post("/tasks", (req, res) => {
  const taskName = req.body.taskName;
  const parsedUserId = req.body.parsedUserId;

  db.query(
    "INSERT INTO Tasks (Task_title, User_id) VALUES (?, ?)",
    [taskName, parsedUserId],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Wrong email/password" });
      }
    }
  );
});

app.post("/getMissions", (req, res) => {
  const User_id = req.body.User_id;

  db.query(
    "SELECT missionName, missionValue FROM missions WHERE User_id = ?",
    [User_id],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/addMission", (req, res) => {
  const User_id = req.body.User_id;
  const missionName = req.body.missionName;
  const missionValue = req.body.missionValue;

  db.query(
    "INSERT INTO missions (missionName, missionValue, User_id) VALUES (?, ?, ?)",
    [missionName, missionValue, User_id],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.post("/claimReward", (req, res) => {
  const Task_id = req.body.Task_id;
  const TodaysDate = req.body.TodaysDate;

  db.query(
    "INSERT INTO doneDates (Task_id, Task_doneDate) VALUES (?, ?)",
    [Task_id, TodaysDate],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Bad request" });
      }
    }
  );
});

app.listen(8081, () => {
  console.log("listening");
});
