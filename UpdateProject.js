"use strict";

class UpdateProject {
  get rules() {
    return {
      project_start_date: "date",
      project_end_date: "date",
    };
  }

  get messages() {
    return {
      "project_start_date.date": "Project start date must be a date.",
      "project_end_date.date": "Project end date must be a date.",
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
