"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PermissionSchema extends Schema {
  up() {
    this.create("permissions", (table) => {
      table.increments("permission_id");
      table.string("permission_name", 255).nullable();
      table
        .integer("permission_role_id")
        .unsigned()
        .references("role_id")
        .inTable("roles");
      table.string("permission_description", 255).notNullable();
      table.string("permission_module", 255).notNullable();
      table.string("permission_action", 255).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("permissions");
  }
}

module.exports = PermissionSchema;
