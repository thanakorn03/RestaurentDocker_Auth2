import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Role.sync({ force: true })
//   .then(() => {
//     Role.create({ id: 1, name: "user" });
//     Role.create({ id: 2, name: "moderator" });
//     Role.create({ id: 3, name: "admin" });
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default Role;