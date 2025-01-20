// build your `/api/resources` router here

const express = require("express");
const resourceRouter = express.Router();

const resources = require("./model");

resourceRouter.get("/", (req, res, next) => {
  resources
    .get()
    .then((resources) => {
      res.json(resources);
    })
    .catch(next);
});

resourceRouter.post("/", (req, res, next) => {
  resources
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = resourceRouter;
