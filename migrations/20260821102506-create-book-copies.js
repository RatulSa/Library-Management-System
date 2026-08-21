"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BookCopies", {
            bid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            isbn: {
                type: Sequelize.STRING(20),
                allowNull: false,

                references: {
                    model: "Books",
                    key: "isbn",
                },

                onUpdate: "NO ACTION",
                onDelete: "NO ACTION",
            },

            status: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("BookCopies");
    },
};