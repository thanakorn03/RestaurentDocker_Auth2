// Judge.js
import { DataTypes } from "sequelize";
import User from "./user.model.js";

class Judge extends User {}

Judge.init(
  {
    expertise: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: User.sequelize,
    modelName: "Judge",
    tableName: "judges",
    hooks: {
      beforeCreate: (judge) => {
        judge.type = "judge";
      },
    },
  }
);

export default Judge;
