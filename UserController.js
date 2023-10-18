"use strict";
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const Project_User = use("App/Models/ProjectCollaborator");
const Project = use("App/Models/Project");

const { tmpdir } = require("os");
const { join } = require("path");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../../../config/cloudinary");

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

class UserController {
  async index({ request, response }) {
    const page = request.input("page", 1);
    // const limit = 5;
    const name = request.input("name", "");
    const users = await User.query()
      .where("user_fullname", "LIKE", `%${name}%`)
      .paginate(page);

    return response.json(users);
  }

  // assign project to a user
  async assignProject({ request, response }) {
    const { project_id, user_id } = request.all();
    const project = await Project.find(project_id);
    if (!project) {
      return response.status(404).send({
        error: "This project does not exist.",
      });
    }
    // check if that project is already assigned to that user
    const projectUserExists = await Project_User.query()
      .where("project_id", project_id)
      .where("user_id", user_id)
      .fetch();
    if (projectUserExists.rows.length > 0) {
      return response.status(404).send({
        error: "This project is already assigned to that user",
      });
    }
    const projectUser = await Project_User.create({
      project_id,
      user_id,
    });
    const user = await User.find(user_id);
    return response.json({ projectUser, user });
  }

  // delete project from a user
  async deleteProject({ request, response }) {
    const { project_id, user_id } = request.all();
    const project = await Project.find(project_id);
    if (!project) {
      return response.status(404).send({
        error: "This project does not exist.",
      });
    }
    // check if that project is already assigned to that user
    const projectUserExists = await Project_User.query()
      .where("project_id", project_id)
      .where("user_id", user_id)
      .fetch();
    if (projectUserExists.rows.length === 0) {
      return response.status(404).send({
        error: "This project is not assigned to that user",
      });
    }

    const projectUser = await Project_User.query()
      .where("project_id", project_id)
      .where("user_id", user_id)
      .delete();
    const user = await User.find(user_id);
    user.user_workload -= 30;
    await user.save();
    return response.json({ projectUser, user });
  }

  // get user with projects
  async getUserWithProjects({ params, response }) {
    try {
      const user = await User.query()
        .where("user_id", params.user_id)
        .with("projects")
        .firstOrFail();
      const projectCount = await user.projects().getCount();
      return response.json({ user, projectCount });
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error:
            "There was a problem retrieving the user, please try again later.",
        });
    }
  }
  async show({ params, response }) {
    try {
      const user = await User.query()
        .where("user_id", params.user_id)
        .firstOrFail();
      return response.json({ user });
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error:
            "There was a problem retrieving the user, please try again later.",
        });
    }
  }
  // update user profile
  async update({ params, request, response }) {
    try {
      const user = await User.find(params.user_id);
      const {
        user_fullname,
        user_address,
        user_phone,
        email,
        password,
        user_deparement_id,
        user_role_id,
      } = request.only([
        "user_fullname",
        "user_address",
        "user_phone",
        "email",
        "password",
        "user_deparement_id",
        "user_role_id",
      ]);

      // Upload user image to Cloudinary
      const imageFile = request.file("user_image", {
        types: ["image"],
        size: "2mb",
      });

      if (imageFile) {
        await imageFile.move(tmpdir(), {
          name: `${new Date().getTime()}.${imageFile.subtype}`,
          overwrite: true,
        });

        if (!imageFile.moved()) {
          throw new Error("Failed to upload user image");
        }

        const result = await cloudinary.uploader.upload(
          join(tmpdir(), imageFile.fileName),
          {
            folder: "user_images",
          }
        );

        user.user_image = result.secure_url;
        return response.json("User image updated successfully");
      }

      user.user_fullname = user_fullname;
      user.user_address = user_address;
      user.user_phone = user_phone;
      user.email = email;
      user.password = password;
      user.user_deparement_id = user_deparement_id;
      user.user_role_id = user_role_id;
      await user.save();
      return response.json("User updated successfully");
    } catch (error) {
      console.log(error),
        response.status(500).send({
          error:
            "There was a problem updating the user, please try again later.",
        });
    }
  }

  // get Current User
  async getCurrentUser({ auth, response }) {
    try {
      const user = await auth.getUser()
      return response.json( user);
    } catch (error) {
      console.log(error),
        response.status(401).send({
          error:
            "You are not logged in! ')",
        });
    }
  }
}

module.exports = UserController;
