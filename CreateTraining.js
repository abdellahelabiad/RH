"use strict";

class CreateTraining {
  get rules() {
    return {
      training_name: "required",
      training_description: "required",
      training_type: "required",
      training_duration: "required",
      training_link: "required",
    };
  }

  get messages() {
    return {
      "training_name.required": "You must provide a training name.",
      "training_description.required":
        "You must provide a training description.",
      "training_type.required": "You must provide a training type.",
      "training_duration.required": "You must provide a training duration.",
      "training_link.required": "You must provide a training link.",
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

module.exports = CreateTraining;
