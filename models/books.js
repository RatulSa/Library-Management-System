const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define(
    "Book",
    {
        isbn: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
        },

        bname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        author_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    },
    {
        tableName: "Books",
        timestamps: false,
    }
);

module.exports = Book;