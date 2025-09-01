import sequelize from "../model/db.js";
import { Sequelize } from "sequelize";
import User from "./user.model.js";
import Role from "./role.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Role = Role;

// Associations
db.User.belongsToMany(db.Role, {
    through: "user_roles",
    foreignKey: "userUsername",  // Foreign key in user_roles table
    otherKey: "roleId",          // Other foreign key in user_roles table
    as: "roles"                  // Alias for easier queries
});

db.Role.belongsToMany(db.User, {
    through: "user_roles", 
    foreignKey: "roleId",        // Foreign key in user_roles table
    otherKey: "userUsername",    // Other foreign key in user_roles table
    as: "users"                  // Alias for easier queries
});
export default db;
