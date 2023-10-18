"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectCollaboratorSchema extends Schema {
  up() {
    this.create("project_collaborators", (table) => {
      table.increments("project_collaborator_id");
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("cascade");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("project_collaborators");
  }
}

module.exports = ProjectCollaboratorSchema;
