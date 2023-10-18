"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Departement extends Model {
  static get primaryKey() {
    return "departement_id";
  }
  static get table() {
    return "departements";
  }

  users() {
    return this.hasMany("App/Models/User");
  }

  projects() {
    return this.hasMany("App/Models/Project");
  }
}

module.exports = Departement;
