"use strict";

const Task = use("App/Models/Task");
const TaskCollaborator = use("App/Models/TaskCollaborator");

class TaskController {
  //create task
  async store({ request, response }) {
    try {
      const task = await Task.create(
        request.only([
          "task_project_id",
          "task_name",
          "task_description",
          "task_feature",
          "task_type",
          "task_start_date",
          "task_end_date",
          "task_priority",
          "task_complexity",
        ])
      );
      return response.json(task);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: "There was a problem creating the task, please try again later.",
      });
    }
  }

  //get all tasks
  async index({ request, response }) {
    try {
      const tasks = await Task.all();
      return response.json(tasks);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the tasks, please try again later.",
      });
    }
  }

  //get task by id
  async show({ request, response }) {
    try {
      const task = await Task.find(request.params.task_id);
      if (!task) {
        return response.status(404).send({
          error: "No task found",
        });
      }
      return response.json(task);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem retrieving the task, please try again later.",
      });
    }
  }

  //update task
  async update({ request, response }) {
    try {
      const task = await Task.find(request.params.task_id);
      if (!task) {
        return response.status(404).send({
          error: "No task found",
        });
      }
      // if the task status is to do progress is 0 % , else if task status is wip progress is 30 % else if , task status is ready for test progress is 60 % , else if task status is done progress is 100 %
      if (request.body.task_dev_status === "to do") {
        task.task_progress = 0;
      }
      if (request.body.task_dev_status === "wip") {
        task.task_progress = 30;
      }
      if (request.body.task_dev_status === "ready for test") {
        task.task_progress = 60;
      }
      if (request.body.task_dev_status === "done") {
        task.task_progress = 100;
      }
      task.task_project_id = request.body.task_project_id;
      task.task_name = request.body.task_name;
      task.task_description = request.body.task_description;
      task.task_feature = request.body.task_feature;
      task.task_type = request.body.task_type;
      task.task_start_date = request.body.task_start_date;
      task.task_end_date = request.body.task_end_date;
      task.task_priority = request.body.task_priority;
      task.task_complexity = request.body.task_complexity;
      task.task_dev_status = request.body.task_dev_status;

      await task.save();
      return response.json(task);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: "There was a problem updating the task, please try again later.",
      });
    }
  }

  //delete task
  async destroy({ request, response }) {
    try {
      const task = await Task.find(request.params.task_id);
      if (!task) {
        return response.status(404).send({
          error: "No task found",
        });
      }
      await task.delete();
      return response.json({
        message: "Task deleted",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: "There was a problem deleting the task, please try again later.",
      });
    }
  }
  // assign a task to a user
  async assignTask({ request, response }) {
    try {
      const { task_id, user_id } = request.all()
      const task = await Task.find(task_id);
      if (!task) {
        return response.status(404).send({
          error: "No task found",
        });
      }
      const taskCollaboratorExists = await TaskCollaborator.query()
        .where("task_id", task_id)
        .where("user_id", user_id)
        .fetch();
      if (taskCollaboratorExists.rows.length > 0) {
        return response.status(404).send({
          error: "This task is already assigned to that user",
        });
      }

      const taskCollaborator = await TaskCollaborator.create({
        task_id,
        user_id,
      });
      return response.json(taskCollaborator);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error:
          "There was a problem assigning the task, please try again later.",
      });
    }
  }
}

module.exports = TaskController;
