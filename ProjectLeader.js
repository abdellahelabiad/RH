"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProjectLeader extends Model {
  static get table() {
    return "project_leaders";
  }

  users() {
    return this.belongsTo("App/Models/User");
  }

  project() {
    return this.belongsTo("App/Models/Project");
  }
}

module.exports = ProjectLeader;
