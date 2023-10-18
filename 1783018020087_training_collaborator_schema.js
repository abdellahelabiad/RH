"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TrainingCollaboratorSchema extends Schema {
  up() {
    this.create("training_collaborators", (table) => {
      table.increments("training_collaborator_id");
      table
        .integer("training_id")
        .unsigned()
        .references("training_id")
        .inTable("trainings")
        .onDelete("CASCADE");
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
    this.drop("training_collaborators");
  }
}

module.exports = TrainingCollaboratorSchema;
