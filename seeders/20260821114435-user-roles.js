"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("UserRoles", [
            {
                role_name: "Librarian",
            },
            {
                role_name: "Student",
            },
            {
                role_name: "Faculty",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("UserRoles", null, {});
    },
};