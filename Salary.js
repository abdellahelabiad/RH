"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Salary extends Model {
  static get primaryKey() {
    return "salary_id";
  }

  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Salary;
