"use strict";
const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Hash = use("Hash");
const jwt = use("jsonwebtoken");

const { tmpdir } = require("os");
const { join } = require("path");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../../../config/cloudinary");

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

class AuthController {
  async register({ request, response }) {
    try {
      const userData = request.only([
        "email",
        "password",
        "user_fullname",
        "user_address",
        "user_phone",
        // "user_image",
        "user_department_id",
        "user_role_id",
      ]);

      // Upload user image to Cloudinary
      // const imageFile = request.file("user_image", {
      //   types: ["image"],
      //   size: "2mb",
      // });

      // if (imageFile) {
      //   await imageFile.move(tmpdir(), {
      //     name: `${new Date().getTime()}.${imageFile.subtype}`,
      //     overwrite: true,
      //   });

      //   if (!imageFile.moved()) {
      //     throw new Error("Failed to upload user image");
      //   }

      //   const result = await cloudinary.uploader.upload(
      //     join(tmpdir(), imageFile.fileName),
      //     {
      //       folder: "user_images",
      //     }
      //   );

      //   userData.user_image = result.secure_url;
      // }

      const user = await User.create(userData);
      return response.json(user);
    } catch (error) {
      console.error(error);

      return response.status(500).send({
        error: "There was a problem creating the user, please try again later.",
      });
    }
  }

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      const user = await User.findBy("email", email);

      if (!user) {
        return response.status(404).send({ error: "User not found" });
      }

      const userRoleName = await Role.findBy("role_id", user.user_role_id);

      // if (!email.endsWith("@harmony.ma")) {
      //   return response.status(401).send({ error: "Invalid email" });
      // }
      const isPasswordValid = await Hash.verify(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).send({ error: "Invalid password" });
      }

      const token = await auth.withRefreshToken().generate(user);

      // Decode the access token to get the expiry date
      const decodedToken = jwt.decode(token.token);

      const userWithoutPassword = {
        user_id: user.user_id,
        email: user.email,
        user_fullname: user.user_fullname,
        user_address: user.user_address,
        user_phone: user.user_phone,
        // user_image: user.user_image,
        user_department_id: user.user_department_id,
        user_role_id: user.user_role_id,
      };

      return response.json({
        user: userWithoutPassword,
        role: userRoleName.role_name,
        token: token.token,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
        refreshToken: token.refreshToken,
      });
    } catch (error) {
      console.error(error);

      return response.status(500).send({ error: "Server error" });
    }
  }

  async refreshAccessToken({ request, auth, response }) {
    try {
      const refreshToken = request.input("refresh_token");

      if (!refreshToken) {
        return response.status(400).send({ error: "Refresh token missing" });
      }

      const newToken = await auth.generateForRefreshToken(refreshToken);

      const decodedToken = jwt.decode(newToken.token);

      // const user = await User.find(decodedToken.uid);

      // await auth.authenticator("jwt").revokeTokensForUser(user);

      Object.assign({
        accessToken: newToken.token,
        refreshToken: newToken.refreshToken,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
      });

      return response.json({
        token: newToken.token,
        accessTokenExpiry: new Date(decodedToken.exp * 1000),
        refreshToken: newToken.refreshToken,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .send({ error: "Server error", message: error.message });
    }
  }

  async logout({ auth, response }) {
    try {
      const user = await auth.getUser();

      await auth.authenticator("jwt").revokeTokensForUser(user);

      return response.status(200).send({ message: "Logout successful" });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error: "Server error" });
    }
  }

  async updatePassword({ request, auth, response }) {
    const user = await auth.getUser();
    const { oldPassword, newPassword } = request.only([
      "oldPassword",
      "newPassword",
    ]);

    try {
      // Verify the old password matches
      await auth.attempt(user.email, oldPassword);

      // Update the password
      user.password = newPassword;
      await user.save();

      return response
        .status(200)
        .send({ message: "Password updated successfully." });
    } catch (error) {
      return response.status(401).send({ message: "Invalid credentials." });
    }
  }
}

module.exports = AuthController;
