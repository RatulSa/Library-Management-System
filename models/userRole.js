const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define(
    "UserRole",
    {
        rid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: "UserRoles",
        timestamps: false,
    }
);

module.exports = UserRole;