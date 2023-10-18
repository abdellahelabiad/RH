"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SubtaskSchema extends Schema {
  up() {
    this.create("subtasks", (table) => {
      table.increments("subtask_id");
      table.string("subtask_title", 80).notNullable();
      table.string("subtask_description", 254).notNullable();
      table
        .enum("subtask_status", ["open", "assigned", "wip", "fixed"])
        .notNullable()
        .defaultTo("open");
      table
        .integer("task_id")
        .unsigned()
        .references("task_id")
        .inTable("tasks");

      table.timestamps();
    });
  }

  down() {
    this.drop("subtasks");
  }
}

module.exports = SubtaskSchema;
