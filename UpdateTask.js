"use strict";

class UpdateTask {
  get rules() {
    return {
      task_start_date: "date",
      task_end_date: "date",
    };
  }

  get messages() {
    return {
      "task_end_date.date": "Task start date must be a date.",
      "task_end_date.date": "Task end date must be a date.",
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

module.exports = UpdateTask;
