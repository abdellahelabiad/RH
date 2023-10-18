"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskCollaboratorSchema extends Schema {
  up() {
    this.create("task_collaborators", (table) => {
      table.increments("task_collaborator_id");
      table
        .integer("task_id")
        .unsigned()
        .references("task_id")
        .inTable("tasks");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("task_collaborators");
  }
}

module.exports = TaskCollaboratorSchema;
