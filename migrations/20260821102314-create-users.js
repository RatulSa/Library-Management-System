"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true,
            },

            password: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            rid: {
                type: Sequelize.INTEGER,
                allowNull: false,

                references: {
                    model: "UserRoles",
                    key: "rid",
                },

                onUpdate: "NO ACTION",
                onDelete: "NO ACTION",
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Users");
    },
};