"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TrainingCollaborator extends Model {
  static get table() {
    return "training_collaborators";
  }
  static get primaryKey() {
    return "training_collaborator_id";
  }

  trainings() {
    return this.belongsToMany("App/Models/Training");
  }

  users() {
    return this.belongsToMany("App/Models/User");
  }
}

module.exports = TrainingCollaborator;
