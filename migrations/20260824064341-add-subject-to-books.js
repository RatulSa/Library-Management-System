"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Books", "subject", {
            type: Sequelize.STRING(150),
            allowNull: false,
            defaultValue: "General",
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("Books", "subject");
    },
};