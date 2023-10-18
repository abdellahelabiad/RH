"use strict";
const Training = use("App/Models/Training");
const User = use("App/Models/User");
const Trainig_Collaborattor = use("App/Models/TrainingCollaborator");

class TrainingController {
  //create training
  async store({ request, response }) {
    try {
      const training = await Training.create(
        request.only([
          "training_name",
          "training_description",
          "training_type",
          "training_duration",
          "training_link",
        ])
      );
      return response.json(training);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem creating the training, please try again later.",
      });
    }
  }

  //get all trainings
  async index({ request, response }) {
    try {
      const trainings = await Training.all();
      return response.json(trainings);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the trainings, please try again later.",
      });
    }
  }

  //get training by id
  async show({ request, response }) {
    try {
      const training = await Training.find(request.params.training_id);
      if (!training) {
        return response.status(404).send({
          error: "No training found",
        });
      }
      return response.json(training);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the training, please try again later.",
      });
    }
  }

  //update training
  async update({ request, response }) {
    try {
      const training = await Training.find(request.params.training_id);
      if (!training) {
        return response.status(404).send({
          error: "No training found",
        });
      }
      training.training_name = request.body.training_name;
      training.training_description = request.body.training_description;
      training.training_type = request.body.training_type;
      training.training_duration = request.body.training_duration;
      training.training_link = request.body.training_link;
      await training.save();
      return response.json(training);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem updating the training, please try again later.",
      });
    }
  }

  //delete training
  async destroy({ request, response }) {
    try {
      const training = await Training.find(request.params.training_id);
      if (!training) {
        return response.status(404).send({
          error: "No training found",
        });
      }
      await training.delete();
      return response.json({
        message: "Training deleted.",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem deleting the training, please try again later.",
      });
    }
  }

  //Assing collaborator to training
  async assingTraining({ request, response }) {
    try {
      const { training_id, user_id } = request.all();
      const training = await Training.find(training_id);
      if (!training) {
        return response.status(404).send({
          error: "No training found",
        });
      }
      const collaborator = await User.find(user_id);
      if (!collaborator) {
        return response.status(404).send({
          error: "No collaborator found",
        });
      }
      const trainingCollaboratorExists = await Trainig_Collaborattor.query()
        .where("training_id", training_id)
        .where("user_id", user_id)
        .fetch();
      if (trainingCollaboratorExists.rows.length > 0) {
        return response.status(404).send({
          error: "This collaborator is already assigned to that training",
        });
      }
      const trainingCollaborator = await Trainig_Collaborattor.create({
        training_id,
        user_id,
      });
      return response.json({ trainingCollaborator, collaborator });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem assigning the collaborator to the training, please try again later.",
      });
    }
  }
}

module.exports = TrainingController;
