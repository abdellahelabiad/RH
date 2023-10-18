"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SuggestionSchema extends Schema {
  up() {
    this.create("suggestions", (table) => {
      table.increments("suggestion_id");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("suggestion_name", 255).notNullable();
      table.string("suggestion_description", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("suggestions");
  }
}

module.exports = SuggestionSchema;
