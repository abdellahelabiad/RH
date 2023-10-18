"use strict";

class CreateTask {
  get rules() {
    return {
      task_name: "required",
      task_description: "required",
      task_feature: "required",
      task_type: "required",
      task_start_date: "required|date",
      task_end_date: "required|date",
      task_priority: "required",
      task_complexity: "required",
    };
  }

  get messages() {
    return {
      "task_name.required": "You must provide a task name.",
      "task_description.required": "You must provide a task description.",
      "task_feature.required": "You must provide a task feature.",
      "task_type.required": "You must provide a task type.",
      "task_start_date.required": "You must provide a task start date.",
      "task_start_date.date": "Task start date must be a date.",
      "task_end_date.required": "You must provide a task end date.",
      "task_end_date.date": "Task end date must be a date.",
      "task_priority.required": "You must provide a task priority.",
      "task_complexity.required": "You must provide a task complexity.",
      "task_dev_status.required": "You must provide a task dev status.",
      "task_rework.required": "You must provide a task rework.",
      "task_comments.max": "Task comments must be less than 200 characters.",
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

module.exports = CreateTask;
