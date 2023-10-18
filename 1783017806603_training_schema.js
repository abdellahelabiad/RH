"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TrainingSchema extends Schema {
  up() {
    this.create("trainings", (table) => {
      table.increments("training_id");
      table.string("training_name", 255).notNullable();
      table.string("training_description", 255).notNullable();
      table.string("training_type", 255).notNullable();
      table.string("training_duration", 255).notNullable();
      table.string("training_link", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("trainings");
  }
}

module.exports = TrainingSchema;
