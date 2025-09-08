import sequelize from "../model/db.js";
import { Sequelize } from "sequelize";
import User from "./user.model.js";
import Teacher from "./Teacher.js";
import Admin from "./admin.js";
import Judge from "./Judge.js";
import VerificationToken from "./VerificationToken.js";
import Activity from "./Activity.js";

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
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.belongsTo(db.VerificationToken, { foreignKey: "userId" });
export default db;
