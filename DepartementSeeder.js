"use strict";

/*
|--------------------------------------------------------------------------
| DepartementSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class DepartementSeeder {
  async run() {
    const departements = await Factory.model(
      "App/Models/Departement"
    ).createMany(2);
  }
}

module.exports = DepartementSeeder;
