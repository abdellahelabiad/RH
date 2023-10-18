"use strict";

class UpdateSalary {
  get rules() {
    return {
      salary_amount: "number",
      salary_incentives: "number",
    };
  }

  get messages() {
    return {
      "salary_amount.number": "Salary amount must be a number.",
      "salary_incentives.number": "Salary incentives must be a number.",
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

module.exports = UpdateSalary;
