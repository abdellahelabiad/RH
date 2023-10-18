"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProjectManager extends Model {
  static get table() {
    return "project_managers";
  }

  users() {
    return this.belongsTo("App/Models/User");
  }

  projects() {
    return this.belongsTo("App/Models/Project");
  }
}

module.exports = ProjectManager;
