"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DepartementSchema extends Schema {
  up() {
    this.create("departements", (table) => {
      table.increments("departement_id");
      table.string("departement_name", 80).notNullable().unique();
      table.string("departement_description", 254).nullable();
      table.string("departement_type", 80).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("departements");
  }
}

module.exports = DepartementSchema;
