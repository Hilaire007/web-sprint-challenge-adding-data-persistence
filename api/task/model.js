// build your `Task` model here

const db = require("../../data/dbConfig");
module.exports = {
  get,
  insert,
};
function get() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    )
    .then((tasks) => {
      return tasks.map((task) => {
        return {
          ...task,
          task_completed: task.task_completed ? true : false,
        };
      });
    });
}
function insert(tasks) {
  return db("tasks")
    .insert(tasks)
    .then(([task_id]) => {
      return db("tasks")
        .where("task_id", task_id)
        .first()
        .then((task) => {
          return {
            ...task,
            task_completed: task.task_completed ? true : false,
          };
        });
    });
}
