// /app/model/Teacher.js
import { DataTypes } from "sequelize";
import User from "./user.model.js"; // ตรวจสอบ path ให้ถูกต้อง
import sequelize from "./db.js"; // path ต้องตรงกับ db.js จริง
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
    sequelize, // ✅ ต้องใส่ sequelize instance
    modelName: "Teacher",
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
