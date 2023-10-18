"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TaskCollaborator extends Model {
  static get table() {
    return "task_collaborators";
  }
  tasks() {
    return this.belongsTo("App/Models/Task");
  }

  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = TaskCollaborator;
