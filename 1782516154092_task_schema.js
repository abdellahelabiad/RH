"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table.increments("task_id");
      table.integer("task_project_id").unsigned().nullable().references("project_id").inTable("projects");
      table.string("task_name", 80).notNullable();
      table.string("task_description", 254).notNullable();
      table.string("task_feature", 254).notNullable();
      table.string("task_type", 245).notNullable();
      table.date("task_start_date").notNullable();
      table.date("task_end_date").notNullable();
      table.enu("task_priority", ["low", "medium", "high", "critical"]).notNullable();
      table.enu("task_complexity", ["low", "medium", "high"]).notNullable();
      table.enu("task_dev_status", ["to do","wip","pending","blocked","ready for test","rework","done",])
        .notNullable().defaultTo("to do");
      table.boolean("task_functional_test_status").notNullable().defaultTo(0);
      table.integer("task_progress").notNullable().defaultTo(0);
      table.string("task_comments", 245).nullable();
      table.integer("task_estimated_workload").nullable();
      table.string("task_issue_status").nullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TaskSchema;
