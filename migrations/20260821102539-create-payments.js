"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Payments", {
            pid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,

                references: {
                    model: "Users",
                    key: "uid",
                },

                onUpdate: "NO ACTION",
                onDelete: "NO ACTION",
            },

            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },

            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Payments");
    },
};