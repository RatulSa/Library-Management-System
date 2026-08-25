const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(100)
        .required(),

    rid: Joi.number()
        .integer()
        .positive()
        .required(),
});

module.exports = userSchema;