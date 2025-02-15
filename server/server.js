require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    "SELECT tasks.Task_id, tasks.User_id, donedates.Task_doneDate FROM tasks JOIN donedates ON tasks.Task_id = donedates.Task_id";
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
    "SELECT * FROM tasks WHERE User_id = ?",
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
    "INSERT INTO donedates (Task_id, Task_doneDate) VALUES (?, ?)",
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
    "DELETE FROM donedates WHERE Task_id = ? AND Task_doneDate = ?",
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
    "DELETE FROM donedates WHERE Task_id = ?",
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

  db.query("DELETE FROM tasks WHERE Task_id = ?", [Task_id], (err, result) => {
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
    "INSERT INTO tasks (Task_title, User_id) VALUES (?, ?)",
    [taskName, parsedUserId],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      }

      if (result.length > 0) {
        return res.send(result);
      } else {
        return res.send({ message: "Wrong" });
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
    "INSERT INTO donedates (Task_id, Task_doneDate) VALUES (?, ?)",
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

app.post("/addStreakReward", (req, res) => {
  const streakReward_title = req.body.streakReward_title;
  const streakReward_value = req.body.streakReward_value;
  const User_id = req.body.User_id;

  db.query(
    "INSERT INTO streakrewards (streakReward_title, streakReward_value, User_id) VALUES (?, ?, ?)",
    [streakReward_title, streakReward_value, User_id],
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

app.post("/getStreakRewards", (req, res) => {
  const User_id = req.body.User_id;

  db.query(
    "SELECT * FROM streakrewards WHERE User_id = ?",
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

app.listen(process.env.DB_PORT, () => {
  console.log("listening");
});
