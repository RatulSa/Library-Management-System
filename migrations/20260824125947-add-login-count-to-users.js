"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            "Users",
            "login_count",
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.removeColumn(
            "Users",
            "login_count"
        );

    },
};