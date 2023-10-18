"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments("user_id");
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("user_fullname").notNullable();
      table.bigInteger("user_phone").notNullable();
      table.string("user_address").notNullable();
      // table.string("user_image").notNullable();
      table
        .integer("user_department_id")
        .unsigned()
        .notNullable()
        .references("departement_id")
        .inTable("departements");
      table
        .integer("user_role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles");
      table
        .enum("user_status", ["active", "inactive"])
        .notNullable()
        .defaultTo("active");

      table.integer("user_workload").nullable().defaultTo("0");
      table.date("user_start_date").nullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
