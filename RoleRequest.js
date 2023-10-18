"use-strict";

class RoleRequest {
  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).json({
      status: "error",
      message: errorMessages[0].message,
    });
  }

  get rules() {
    return {
      role_name: "required",
      role_description: "required",
    };
  }

  get messages() {
    return {
      "role_name.required": "You must provide a role name.",
      "role_description.required": "You must provide a role description.",
    };
  }
}

module.exports = RoleRequest;
