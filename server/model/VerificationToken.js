// VerificationToken.js
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const VerificationToken = sequelize.define("verification_token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" }, // ใช้ชื่อ table เป็น string
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  expires_at: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: "verification_tokens"
});

export default VerificationToken;
