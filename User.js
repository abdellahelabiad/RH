"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
  static get primaryKey() {
    return "user_id";
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  roles() {
    return this.belongsTo("App/Models/Role");
  }

  departments() {
    return this.belongsTo("App/Models/Department");
  }

  tasks() {
    return this.belongsToMany("App/Models/Task").pivotModel(
      "App/Models/TaskCollaborator"
    );
  }

  documents() {
    return this.hasMany("App/Models/Document");
  }

  appraisals() {
    return this.hasMany("App/Models/Appraisal");
  }

  salaries() {
    return this.hasOne("App/Models/Salary");
  }

  trainings() {
    return this.belongsToMany("App/Models/Training").pivotModel(
      "App/Models/TrainingCollaborator"
    );
  }

  skills() {
    return this.hasMany("App/Models/Skill")
  }

  projects() {
    return this.belongsToMany("App/Models/Project").pivotModel(
      "App/Models/ProjectCollaborator"
    );
  }
}

module.exports = User;
