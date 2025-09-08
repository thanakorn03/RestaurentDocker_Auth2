import { DataTypes } from "sequelize";
import User from "./user.model";
import bcrypt from "bcryptjs";

const Admin = User.init(
  {
    scopes: {
      defaultScope: {
        where: {
          type: "Admin",
        },
      },
    },
    hooks: {
      beforeCreate: async (Admin) => {
        Admin.type = "Admin";
      },
    },
  }
);

export default Admin;
