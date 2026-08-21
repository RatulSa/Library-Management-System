"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("BookCopies", [
            {
                isbn: "9780132350884",
                status: "available",
            },
            {
                isbn: "9780132350884",
                status: "available",
            },
            {
                isbn: "9780131103627",
                status: "available",
            },
            {
                isbn: "9780134685991",
                status: "available",
            },
            {
                isbn: "9780134685991",
                status: "available",
            },
            {
                isbn: "9781491950296",
                status: "available",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("BookCopies", null, {});
    },
};