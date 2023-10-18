"use strict";
const Risk = use("App/Models/Risk");

class RiskController {
  //create risk
  async store({ request, response }) {
    try {
      const risk = await Risk.create(
        request.only([
          "risk_name",
          "risk_description",
          "impact_description",
          "impact_level",
          "probability_level",
          "criticality_level",
          "mitigation_plan",
        ])
      );

      return response.status(201).json(risk);
    } catch (error) {
      return response.status(400).json({
        message: "Error",
      });
    }
  }

  //list all risks
  async index({ request, response }) {
    try {
      const risks = await Risk.all();
      return response.status(200).json(risks);
    } catch (error) {
      return response.status(400).json({
        message: "Error!",
      });
    }
  }

    //show risk
    async show({ params, response}) {
        try {
            const risk = await Risk.findOrFail(params.risk_id);
            return response.status(200).json(risk);
        } catch (error) {
            return response.status(400).json({
            message: "Error!",
            });
        }   
    }

    //update risk
    async update({ params, request, response }) {
        try {
            const risk = await Risk.findOrFail(params.risk_id);
            risk.merge(
                request.only([
                    "risk_name",
                    "risk_description",
                    "impact_description",
                    "impact_level",
                    "probability_level",
                    "criticality_level",
                    "mitigation_plan",
                ])
            );
            await risk.save();
            return response.status(200).json(risk);
        } catch (error) {
            return response.status(400).json({
            message: "Error!",
            });
        }
    }

    //delete risk
    async destroy({ params, response }) {
        try {
            const risk = await Risk.findOrFail(params.risk_id);
            await risk.delete();
            return response.status(200).json({
                message: "!",
            });
        } catch (error) {
            return response.status(400).json({
            message: "Error!",
            });
        }
    }
}

module.exports = RiskController;
