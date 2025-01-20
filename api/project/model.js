// build your `Project` model here

const db = require("../../data/dbConfig");
module.exports = {
  get,
  insert,
};
function get() {
  return db("projects").then((projects) => {
    return projects.map((project) => {
      return {
        ...project,
        project_completed: project.project_completed ? true : false,
      };
    });
  });
}
function insert(project) {
  return db("projects")
    .insert(project)
    .then(([project_id]) => {
      return db("projects")
        .where("project_id", project_id)
        .first()
        .then((project) => {
          return {
            ...project,
            project_completed: project.project_completed ? true : false,
          };
        });
    });
}
