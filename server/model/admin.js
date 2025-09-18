import User from "./user.model.js";
import sequelize from "./db.js";

const Admin = User.init(
  {},
  {
    sequelize,
    modelName: "Admin",
    scopes: {
      defaultScope: { where: { type: "Admin" } },
    },
    hooks: {
      beforeCreate: async (admin) => {
        admin.type = "Admin";
      },
    },
  }
);

export default Admin;
