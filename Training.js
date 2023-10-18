"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Training extends Model {
  static get primaryKey() {
    return "training_id";
  }
  users() {
    return this.belongsToMany("App/Models/User");
  }
}

module.exports = Training;
