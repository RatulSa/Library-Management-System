"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Records", {
            id: {
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

            bid: {
                type: Sequelize.INTEGER,
                allowNull: false,

                references: {
                    model: "BookCopies",
                    key: "bid",
                },

                onUpdate: "NO ACTION",
                onDelete: "NO ACTION",
            },

            issued_on: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            due_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            returned_on: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Records");
    },
};