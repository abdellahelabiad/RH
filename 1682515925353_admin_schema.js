"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdminSchema extends Schema {
  up() {
    this.create("admins", (table) => {
      table.increments("admin_id");
      table.string("name", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("admins");
  }
}

module.exports = AdminSchema;
