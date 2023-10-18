"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Document extends Model {
  static get table() {
    return "documents";
  }
  users() {
    return this.belongsToMany("App/Models/User").pivotTable("document_user");
  }
}

module.exports = Document;
