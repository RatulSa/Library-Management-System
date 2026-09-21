"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Books", [
            {
                isbn: "9780132350884",
                bname: "Clean Code",
                author_name: "Robert C. Martin",
                price: 650.00,
                subject: "C",
            },
            {
                isbn: "9780131103627",
                bname: "The C Programming Language",
                author_name: "Brian Kernighan",
                price: 500.00,
                subject: "C",
            },
            {
                isbn: "9780134685991",
                bname: "Effective Java",
                author_name: "Joshua Bloch",
                price: 800.00,
                subject: "Java",
            },
            {
                isbn: "9781491950296",
                bname: "Designing Data-Intensive Applications",
                author_name: "Martin Kleppmann",
                price: 900.00,
                subject: "Cs",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Books", null, {});
    },
};