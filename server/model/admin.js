// Admin.js
import { DataTypes } from "sequelize";
import User from "./user.model.js";

class Admin extends User {}

Admin.init(
  {
    department: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: User.sequelize,
    modelName: "Admin",
    tableName: "admins",
    hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);

export default Admin;
