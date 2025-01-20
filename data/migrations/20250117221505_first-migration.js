/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("projects", (table) => {
    table.increments("project_id");
    table.string("project_name").notNullable();
    table.string("project_description");
    table.boolean("project_completed").defaultTo(false);
  });

  await knex.schema.createTableIfNotExists("resources", (table) => {
    table.increments("resource_id");
    table.string("resource_name").unique();
    table.string("resource_description");
  });

  await knex.schema.createTableIfNotExists("tasks", (table) => {
    table.increments("task_id");
    table.string("task_description").notNullable();
    table.string("task_notes");
    table.boolean("task_completed").defaultTo(false);
    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTableIfNotExists("project_resources", (table) => {
    table.increments("project_resources_id");
    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("resources_id")
      .unsigned()
      .notNullable()
      .references("resource_id")
      .inTable("resources")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex, Promise) {
  await knex.schema.dropTableIfExists("project_resources");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("projects");
};
