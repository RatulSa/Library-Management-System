"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Payments", [
            {
                uid: 2,
                amount: 50.00,
                date: "2026-08-14",
            },
            {
                uid: 3,
                amount: 100.00,
                date: "2026-08-15",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Payments", null, {});
    },
};