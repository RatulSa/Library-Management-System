const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Record = sequelize.define(
    "Record",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        bid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        issued_on: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        due_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        returned_on: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        tableName: "Records",
        timestamps: false,
    }
);

module.exports = Record;