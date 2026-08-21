const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    "User",
    {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        rid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "Users",
        timestamps: false,
    }
);

module.exports = User;