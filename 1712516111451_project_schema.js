"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectSchema extends Schema {
  up() {
    this.create("projects", (table) => {
      table.increments("project_id");
      table.string("project_name", 255).notNullable();
      table.string("project_description", 255).notNullable();
      table.integer("project_priority", 255).notNullable();
      table.date("project_start_date", 255).notNullable();
      table.date("project_end_date", 255).notNullable();
      table
        .enu("project_milestones", [
          "Kick-Off",
          "Pre-Study Phase",
          "Study Phase",
          "Build Phase",
          "Execution Phase",
          "Roll-Out Phase",
        ])
        .notNullable()
        .defaultTo("Kick-Off");
      table
        .enu("project_status", ["Open", "Closed"])
        .notNullable()
        .defaultTo("Open");
      table.enu("project_type", ["Internal", "External"]).notNullable();
      table.integer("project_progress", 255).notNullable().defaultTo(0);

      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectSchema;
