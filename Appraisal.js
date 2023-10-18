"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Appraisal extends Model {
  users() {
    return this.belongsTo("App/Models/User");
  }
  appraisal_criterias() {
    return this.belongsTo("App/Models/AppraisalCriteria");
  }
}

module.exports = Appraisal;
