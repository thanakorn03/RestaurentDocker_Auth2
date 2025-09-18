import User from "./user.model.js";
import sequelize from "./db.js";

const Judge = User.init(
  {},
  {
    sequelize,
    modelName: "Judge",
    scopes: {
      defaultScope: { where: { type: "Judge" } },
    },
    hooks: {
      beforeCreate: async (judge) => {
        judge.type = "Judge";
      },
    },
  }
);

export default Judge;
