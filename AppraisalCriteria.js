"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class AppraisalCriteria extends Model {
  static get table() {
    return "appraisal_criterias";
  }

  appraisals() {
    return this.hasMany("App/Models/Appraisal");
  }
}

module.exports = AppraisalCriteria;
