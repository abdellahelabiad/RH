"use-strict";

class UpdatePasswordRequest {
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
      oldPassword: "required",
      newPassword: "required|confirmed|min:6|max:24",
    };
  }

  get messages() {
    return {
      "oldPassword.required": "You must provide a old password.",
      "newPassword.required": "You must provide a new password.",
      "newPassword.confirmed": "The new password confirmation does not match.",
    };
  }
}

module.exports = UpdatePasswordRequest;
