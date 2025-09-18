// Teacher.js
import { DataTypes } from "sequelize";
import User from "./user.model.js";

class Teacher extends User {}

Teacher.init(
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
    sequelize: User.sequelize, // ✅ ใช้ instance จาก User
    modelName: "Teacher",
    tableName: "teachers", // ถ้าอยากแยก table หรือใช้ users เดียวก็ได้
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher"; // กำหนด type ให้แยกประเภท
      },
    },
  }
);

export default Teacher;
