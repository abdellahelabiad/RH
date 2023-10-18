"use strict";

const User = use("App/Models/User");
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProjectCollaborator extends Model {
  static get table() {
    return "project_collaborators";
  }
  static get primaryKey() {
    return "project_collaborator_id";
  }

  static boot() {
    super.boot();

    this.addHook("afterCreate", async (pivot) => {
      const user = await User.find(pivot.user_id);
      user.user_workload += 30;
      await user.save();
    });
  }

  projects() {
    return this.belongsTo("App/Models/Project");
  }

  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = ProjectCollaborator;
