const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BookCopy = sequelize.define(
    "BookCopy",
    {
        bid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: "BookCopies",
        timestamps: false,
    }
);

module.exports = BookCopy;