"use strict";

class UpdateSkill {
  get rules() {
    return {
      skill_description: "max:200",
    };
  }

  get messages() {
    return {
      "skill_description.max":
        "Skill description must be less than 200 characters.",
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

module.exports = UpdateSkill;
