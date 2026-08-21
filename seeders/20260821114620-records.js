"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Records", [
            {
                uid: 2,
                bid: 1,
                issued_on: "2026-08-01",
                due_date: "2026-08-15",
                returned_on: "2026-08-14",
            },
            {
                uid: 2,
                bid: 3,
                issued_on: "2026-08-10",
                due_date: "2026-08-24",
                returned_on: null,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Records", null, {});
    },
};