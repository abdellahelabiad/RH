'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AppraisalResult extends Model {
  static get table() {
    return 'appraisal_results'
  }
  appraisals() {
    return this.belongsTo('App/Models/Appraisal')
  }

  employees() {
    return this.belongsTo('App/Models/Employee')
  }

  appraisal_criterias() {
    return this.belongsTo('App/Models/AppraisalCriteria')
  }

}

module.exports = AppraisalResult
