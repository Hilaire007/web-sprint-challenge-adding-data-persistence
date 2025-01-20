// build your `/api/projects` router here
const express = require("express");
const projectsRouter = express.Router();

const Projects = require("./model");

projectsRouter.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

projectsRouter.post("/", (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = projectsRouter;
