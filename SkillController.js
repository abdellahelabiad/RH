"use strict";
const Skill = use("App/Models/Skill");
const User = use("App/models/User");

class SkillController {
  //create skill
  async store({ request, response }) {
    try {
      // if the user already has the skill dont add it again
      const skillExists = await Skill.query()
        .where("skill_name", request.body.skill_name)
        .where("user_id", request.body.user_id)
        .fetch();
      if (skillExists.rows.length > 0) {
        return response.status(400).send({
          error: "You already have this skill",
        });
      }
      // if the user doesnt have the skill, add it
      const skill = await Skill.create(
        request.only([
          "skill_name",
          "skill_description",
          "skill_level",
          "user_id",
        ])
      );
      return response.json(skill);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem creating the skill, please try again later.",
      });
    }
  }

  //get all skills
  async index({ request, response }) {
    try {
      const skills = await Skill.all();
      return response.json(skills);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the skills, please try again later.",
      });
    }
  }

  //get skill by id
  async show({ request, response }) {
    try {
      const skill = await Skill.find(request.params.skill_id);
      if (!skill) {
        return response.status(404).send({
          error: "No skill found",
        });
      }
      return response.json(skill);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the skill, please try again later.",
      });
    }
  }

  //update skill
  async update({ request, response }) {
    try {
      const skill = await Skill.find(request.params.skill_id);
      if (!skill) {
        return response.status(404).send({
          error: "No skill found",
        });
      }
      skill.merge(
        request.only(["skill_name", "skill_description", "skill_level"])
      );
      await skill.save();
      return response.json(skill);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem updating the skill, please try again later.",
      });
    }
  }

  //delete skill
  async delete({ request, response }) {
    try {
      const skill = await Skill.find(request.params.skill_id);
      if (!skill) {
        return response.status(404).send({
          error: "No skill found",
        });
      }
      await skill.delete();
      return response.json({ message: "Skill deleted!" });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem deleting the skill, please try again later.",
      });
    }
  }

  //get skill by name
  async getSkillByName({ request, response }) {
    try {
      const skill = await Skill.findBy("skill_name", request.params.skill_name);
      if (!skill) {
        return response.status(404).send({
          error: "No skill found",
        });
      }
      return response.json(skill);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the skill, please try again later.",
      });
    }
  }

  //assing skill to user
  async assignSkillToUser({ request, response }) {
    try {
      const { skill_id, user_id } = request.all();
      const skill = await Skill.find(skill_id);
      if (!skill) {
        return response.status(404).send({
          error: "No skill found",
        });
      }
      const skillExists = await User.query()
        .where("id", user_id)
        .whereHas("skills", (builder) => {
          builder.where("skill_id", skill_id);
        })
        .fetch();
      if (skillExists.rows.length > 0) {
        return response.status(404).send({
          error: "Skill already assigned to user",
        });
      }
      const user = await User.find(user_id);
      if (!user) {
        return response.status(404).send({
          error: "No user found",
        });
      }
      await user.skills().attach([skill_id]);
      return response.json({ message: "Skill assigned to user!" });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem assigning the skill to the user, please try again later.",
      });
    }
  }

  //get all skills from user
  async getUserSkills({ request, response }) {
    try {
      const user = await User.find(request.params.skill_user_id);
      if (!user) {
        return response.status(404).send({
          error: "No user found",
        });
      }
      // get skills from user_id in skill table
      // const skills = await Skill.query().whereHas("users", (builder) => {
      //   builder.where("user_id", request.params.user_id).fetch()
      // });
      const skills = await user.skills().fetch();
      return response.json(skills);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the skills, please try again later.",
      });
    }
  }
}

module.exports = SkillController;
