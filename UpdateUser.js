"use strict";

class UpdateUser {
  get rules() {
    return {
      email: "email | unique:users",
      user_phone: "number | min:10 | max:10 | unique:users",
      password: "min:8",
    };
  }

  get messages() {
    return {
      "user_phone.number": "User phone must be a number.",
      "password.min": "Password must be at least 8 characters.",
      "user_phone.min": "User phone must be at least 10 characters.",
      "user_phone.max": "User phone must be at most 10 characters.",
      "user_phone.unique": "User phone already registered!",
      "email.email": "Invalid email address.",
      "email.unique": "Email already registered!",
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

module.exports = UpdateUser;
