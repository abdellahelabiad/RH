"use strict";
const Departement = use("App/Models/Departement");

class DepartmentController {
  async store({ request, response }) {
    try {
      const departement = await Departement.create(
        request.only(["departement_name"])
      );
      return response.json(departement);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem creating the departement, please try again later.",
      });
    }
  }

  async index({ request, response }) {
    try {
      const departments = await Departement.all();
      return response.json(departments);
    } catch (error) {
      return response.status(500).send({
        error:
          "There was a problem retrieving the Departments, please try again later.",
      });
    }
  }

  async update({ request, response }) {
    try {
      const departement = await Departement.find(request.params.departement_id);
      departement.departement_name = request.input("departement_name");
      await departement.save();

      return response.json(departement);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error:
          "There was a problem updating the departement, please try again later.",
      });
    }
  }

  async destroy({ request, response, params }) {
    try {
      const department = await Departement.find(params.departement_id);
      if (!department) {
        return response.status(404).json({
          message: "Departement not found",
        });
      }

      await department.delete();
      return response.json({
        message: "Departement deleted",
      });
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error:
          "There was a problem deleting the departement, please try again later.",
      });
    }
  }
}

module.exports = DepartmentController;
