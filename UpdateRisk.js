"use strict";

class UpdtaeRisk {
  get rules() {
    return {
      impact_level: "number",
      probability_level: "number",
      criticality_level: "number",
    };
  }

  get messages() {
    return {
      "impact_level.number": "Impact level must be a number.",
      "probability_level.number": "Probability level must be a number.",
      "criticality_level.number": "Criticality level must be a number.",
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

module.exports = UpdtaeRisk;
