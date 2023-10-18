"use strict";

/*
|--------------------------------------------------------------------------
| ProjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProjectSeeder {
  async run() {
    const projects = await Factory.model("App/Models/Project").createMany(2);
  }
}

module.exports = ProjectSeeder;
