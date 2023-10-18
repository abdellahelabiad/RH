"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DocumentUserSchema extends Schema {
  up() {
    this.create("document_users", (table) => {
      table.increments("document_user_id");
      table
        .integer("document_id")
        .unsigned()
        .references("document_id")
        .inTable("documents")
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
    this.drop("document_users");
  }
}

module.exports = DocumentUserSchema;
