const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
    "Payment",
    {
        pid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        tableName: "Payments",
        timestamps: false,
    }
);

module.exports = Payment;