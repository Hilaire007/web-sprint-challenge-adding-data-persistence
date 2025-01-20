// build your `Resource` model here

const db = require("../../data/dbConfig");
module.exports = {
  get,
  insert,
};
function get() {
  return db("resources");
}

function insert(resource) {
  return db("resources")
    .insert(resource)
    .then(([resource_id]) => {
      return db("resources").where("resource_id", resource_id).first();
    });
}
