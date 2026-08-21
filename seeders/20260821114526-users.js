"use strict";

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {

        const password1 = await bcrypt.hash("password123", 10);
        const password2 = await bcrypt.hash("password123", 10);
        const password3 = await bcrypt.hash("password123", 10);

        await queryInterface.bulkInsert("Users", [
            {
                name: "Library Admin",
                email: "admin@library.com",
                password: password1,
                rid: 1,
            },
            {
                name: "Ratul",
                email: "ratul@library.com",
                password: password2,
                rid: 2,
            },
            {
                name: "Dr. Sen",
                email: "sen@library.com",
                password: password3,
                rid: 3,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};