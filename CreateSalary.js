"use strict";

class CreateSalary {
  get rules() {
    return {
      salary_amount: "required|number",
      salary_type: "required",
      salary_user_id: "required",
      salary_total: "required",
    };
  }

  get messages() {
    return {
      "salary_amount.required": "You must provide a salary amount.",
      "salary_amount.number": "Salary amount must be a number.",
      "salary_type.required": "You must provide a salary type.",
      "salary_user_id.required": "A user is required.",
      "salary_total.required": "You must provide a salary total.",
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
