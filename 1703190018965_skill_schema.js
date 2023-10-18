"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SkillSchema extends Schema {
  up() {
    this.create("skills", (table) => {
      table.increments("skill_id");
      table
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.string("skill_name", 255).notNullable();
      table.string("skill_description", 255).notNullable();
      table
        .enu("skill_level", ["Beginner", "Competent", "Proficient", "Expert"])
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("skills");
  }
}

module.exports = SkillSchema;
