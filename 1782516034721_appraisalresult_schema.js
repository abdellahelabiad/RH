"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppraisalresultSchema extends Schema {
  up() {
    this.create("appraisal_results", (table) => {
      table.increments("appraisal_result_id");
      table
        .integer("appraisal_id")
        .unsigned()
        .references("appraisal_id")
        .inTable("appraisals");
      table.string("appraisal_result ", 254).notNullable();
      table.string("appraisal_comment ", 254).notNullable();
      table.string("appraisal_rating ", 254).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("appraisal_results");
  }
}

module.exports = AppraisalresultSchema;
