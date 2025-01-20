// build your `/api/tasks` router here

const express = require("express");
const router = express.Router();

const Task = require("./model");

router.get("/", (req, res, next) => {
  Task.get()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Task.insert(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

module.exports = router;
