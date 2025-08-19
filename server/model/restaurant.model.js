import { DataTypes } from "sequelize";
import sequelize from '../model/db.js';
import e from "express";
const Restaurant = sequelize.define("restaurant", {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
});

Restaurant.sync({ force:false }).then(() => {
    console.log("Restaurant table created successfully!");
}).catch((error) => {
    console.error("Error creating Restaurant table:", error);
});
export default Restaurant;