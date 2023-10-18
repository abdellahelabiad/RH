"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectLeadersSchema extends Schema {
  up() {
    this.create("project_leaders", (table) => {
      table.increments("project_leader_id");
      table
        .integer("project_id")
        .unsigned()
        .references("project_id")
        .inTable("projects");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("project_leaders");
  }
}

module.exports = ProjectLeadersSchema;
