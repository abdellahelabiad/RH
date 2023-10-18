"use strict";

class CreateDepartement {
  get rules() {
    return {
      departement_name: "required|unique:departements",
    };
  }
  get messages() {
    return {
      "departement_name.required": "You must provide a departement name.",
      "departement_name.unique": "Departement name already exists.",
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

module.exports = CreateDepartement;
