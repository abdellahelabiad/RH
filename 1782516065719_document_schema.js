"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DocumentSchema extends Schema {
  up() {
    this.create("documents", (table) => {
      table.increments("document_id");
      table.string("document_name", 80).notNullable().unique();
      table.string("document_description", 254).nullable();
      table.string("document_type", 80).nullable();
      table.date("document_date").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("documents");
  }
}

module.exports = DocumentSchema;
