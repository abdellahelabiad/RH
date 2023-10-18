"use strict";

class CreateSkill {
  get rules() {
    return {
      skill_name: "required",
      skill_description: "required|max:200",
      skill_level: "required",
      user_id: "required",
    };
  }

  get messages() {
    return {
      "skill_name.required": "You must provide a skill name.",
      "skill_description.required": "You must provide a skill description.",
      "skill_level.required": "You must provide a skill mastery.",
      "user_id.required": "A user is required.",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).json({
      status: "error",
      message: errorMessages[0].message,
    });
  }

  get validateAll() {
    return true;
  }
}

module.exports = CreateSkill;
