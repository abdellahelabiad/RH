"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppraisalSchema extends Schema {
  up() {
    this.create("appraisals", (table) => {
      table.increments("appraisal_id");
      table
        .integer("collaborator_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.string("appraisal_name", 80).notNullable();
      table.string("appraisal_type", 80).notNullable();
      table.string("appraisal_description ", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("appraisals");
  }
}

module.exports = AppraisalSchema;
