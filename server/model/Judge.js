import { DataTypes } from "sequelize";
import User from "./user.model";
import bcrypt from "bcryptjs";

const Judge = User.init(
  {
    scopes: {
      defaultScope: {
        where: {
          type: "Judge",
        },
      },
    },
    hooks: {
      beforeCreate: async (Judge) => {
        Judge.type = "Judge";
      },
    },
  }
);

export default Judge;
