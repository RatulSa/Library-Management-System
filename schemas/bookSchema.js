const Joi = require("joi");

const bookSchema = Joi.object({
    isbn: Joi.string()
        .max(20)
        .required(),

    bname: Joi.string()
        .min(2)
        .max(150)
        .required(),

    author_name: Joi.string()
        .min(2)
        .max(100)
        .required(),

    price: Joi.number()
        .positive()
        .required(),

    subject: Joi.string()
        .min(2)
        .max(150)
        .required(),
});

module.exports = bookSchema;