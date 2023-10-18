"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Skill extends Model {
  static get primaryKey() {
    return "skill_id";
  }
  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Skill;
