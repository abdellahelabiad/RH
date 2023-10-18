"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CollaboratorSchema extends Schema {
  up() {
    this.create("collaborators", (table) => {
      table.increments("collaborator_id");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table
        .integer("project_id")
        .unsigned()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("collaborators");
  }
}

module.exports = CollaboratorSchema;
