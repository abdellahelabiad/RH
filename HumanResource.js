"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class HumanResource extends Model {
  static get table() {
    return "human_resources";
  }
}

module.exports = HumanResource;
