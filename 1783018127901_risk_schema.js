"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RiskSchema extends Schema {
  up() {
    this.create("risks", (table) => {
      table.increments("risk_id");
      table.string("risk_name", 255).notNullable();
      table.string("risk_description", 255).notNullable();
      table.string("impact_description", 255).notNullable();
      table.integer("impact_level", 255).notNullable();
      table.integer("probability_level", 255).notNullable();
      table.integer("criticality_level", 255).notNullable();
      table.string("mitigation_plan", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("risks");
  }
}

module.exports = RiskSchema;
