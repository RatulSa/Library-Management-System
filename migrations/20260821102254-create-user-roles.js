"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserRoles", {
            rid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            role_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("UserRoles");
    },
};