"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Subtask extends Model {
  static get table() {
    return "subtasks";
  }

  task() {
    return this.belongsTo("App/Models/Task");
  }
}

module.exports = Subtask;
