import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";
import bcrypt from "bcryptjs";


class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isverified: { type: DataTypes.BOOLEAN, defaultValue: false },
    type: { type: DataTypes.STRING, allowNull: false },
    school: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
