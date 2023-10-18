"use strict";
const Role = use("App/Models/Role");

class CheckUserRolePermissions {
  async handle({ auth, response }, next, allowedRoles) {
    const user = await auth.getUser();

    if (!user) {
      return response.status(401).send({ message: "Unauthorized" });
    }
    const role = await Role.find(user.user_role_id);

    const role_name = role.role_name;

    if (!allowedRoles.includes(role_name)) {
      return response
        .status(401)
        .send({ message: "You are not authorized to access this resource" });
    }

    await next();
  }
}

module.exports = CheckUserRolePermissions;
