import { DataTypes } from "sequelize";
import sequelize from "./db.js"; // instance ของ Sequelize
import User from "./user.model.js"; // import model User เพื่อ FK

const VerificationToken = sequelize.define("verification_token", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  token: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, // FK อ้างอิง User
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  expires_at: { 
    type: DataTypes.DATE, 
    allowNull: false 
  }
}, {
  tableName: "verification_tokens"
});

export default VerificationToken;
