"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HumanResourcesSchema extends Schema {
  up() {
    this.create("human_resources", (table) => {
      table.increments("human_resource_id");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.string("designation", 80).notNullable().unique();

      table.timestamps();
    });
  }

  down() {
    this.drop("human_resources");
  }
}

module.exports = HumanResourcesSchema;
