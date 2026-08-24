"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Books", {
            isbn: {
                type: Sequelize.STRING(20),
                primaryKey: true,
                allowNull: false,
            },

            bname: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            author_name: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },

            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            },
            subject:{
                type: Sequelize.STRING(150),
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Books");
    },
};