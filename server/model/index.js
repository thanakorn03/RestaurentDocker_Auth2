import sequelize from "../model/db.js";
import { Sequelize } from "sequelize";

import User from "./user.model.js";
import VerificationToken from "./VerificationToken.js";
import Activity from "./Activity.js";
import Teacher from "./Teacher.js";   // ✅ เพิ่ม
import Admin from "./admin.js";       // ✅ เพิ่ม
import Judge from "./Judge.js";       // ✅ เพิ่ม

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;
db.Teacher = Teacher;
db.Admin = Admin;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

// Associations
// VerificationToken → User
VerificationToken.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(VerificationToken, { foreignKey: "userId", onDelete: "CASCADE" });

export default db;
