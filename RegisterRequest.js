"use strict";

class RegisterRequest {
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
      email: "required|email|unique:users",
      password: "required|confirmed|min:6|max:24",
      user_fullname: "required",
      user_address: "required",
      user_phone: "required | min:10 | max:10 | number | unique:users",
      // user_image: "required",
      user_role_id: "required",
      user_department_id: "required",
    };
  }

  get messages() {
    return {
      "email.required": "You must provide a email field",
      "email.email": "Invalid email address",
      "email.unique": "Email already registered!",
      "password.confirmed": "Password Confirmation not same",
      "password.required": "You must provide a password field",
      "password.min": "Password must be at least 6 characters long",
      "password.max": "Password must be at most 24 characters long",
      "user_fullname.required": "You must provide a fullname field",
      "user_address.required": "You must provide a address field",
      "user_phone.required": "You must provide a phone field",
      "user_phone.min": "Phone must be at least 10 characters long",
      "user_phone.max": "Phone must be at most 10 characters long",
      "user_phone.number": "Phone must be a number",
      "user_phone.unique": "Phone already registered!",
      // "user_image.required": "You must provide a image field",
      "user_role_id.required": "You must provide a role field",
      "user_department_id.required": "You must provide a department field",
    };
  }
}

module.exports = RegisterRequest;
