import { DataTypes } from "sequelize";
import sequelize from "./db.js"; // เชื่อมกับ instance Sequelize

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// ❌ ไม่ควร sync table ที่นี่
// ✅ ให้ sync ที่ index.js รวม model ทั้งหมด

export default User;
