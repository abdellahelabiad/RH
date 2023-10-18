"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const ProjectCollaborator = use("App/Models/ProjectCollaborator");

class Project extends Model {
  static get primaryKey() {
    return "project_id";
  }

  static boot() {
    super.boot();

    this.addHook("beforeDelete", async (project) => {
      try {
        const collaborators = await ProjectCollaborator.query()
          .where("project_id", project.project_id)
          .fetch();

        await Promise.all(
          collaborators.rows.map(async (collaborator) => {
            const user = await collaborator.users().fetch();
            if (user) {
              user.user_workload -= 30;
              await user.save();
            }
          })
        );
      } catch (error) {
        console.error("Error adjusting user workload:", error);
      }
    });

    this.addHook("afterUpdate", async (project) => {
      try {
        const collaborators = await ProjectCollaborator.query()
          .where("project_id", project.project_id)
          .fetch();

        // only update workload if project is Roll-Out Phase
        if (project.project_milestones === "Roll-Out Phase") {
          await Promise.all(
            collaborators.rows.map(async (collaborator) => {
              const user = await collaborator.users().fetch();
              if (user) {
                user.user_workload -= 30;
                await user.save();
              }
            })
          );
        }
      } catch (error) {
        console.error("Error adjusting user workload:", error);
      }
    });
  }

  departments() {
    return this.belongsTo("App/Models/Department");
  }

  tasks() {
    return this.hasMany("App/Models/Task");
  }

  project_managers() {
    return this.belongsTo("App/Models/ProjectManager");
  }

  project_leaders() {
    return this.belongsTo("App/Models/ProjectLeader");
  }
  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/ProjectCollaborator"
    );
  }
}

module.exports = Project;
