"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppraisalCriteriasSchema extends Schema {
  up() {
    this.create("appraisal_criterias", (table) => {
      table.increments("app_criteria_id");
      table
        .integer("appraisal_id")
        .unsigned()
        .references("appraisal_id")
        .inTable("appraisals");
      table.string("criteria_name", 80).notNullable();
      table.string("criteria_weight", 254).notNullable();
      table.string("criteria_description", 254).notNullable();
      table.string("criteria_target", 254).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("appraisal_criterias");
  }
}

module.exports = AppraisalCriteriasSchema;
