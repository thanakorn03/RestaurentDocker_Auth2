import { DataTypes } from "sequelize";
import User from "./user.model";
import bcrypt from "bcryptjs";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {

    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
    hooks: {
      beforeCreate: async (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
