import { Sequelize } from "sequelize";
import sequelize from "./db.js"; // instance Sequelize

const VerificationToken = sequelize.define("verification_token", {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

export default VerificationToken;
