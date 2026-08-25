const Joi = require("joi");

const paymentSchema = Joi.object({
    uid: Joi.number()
        .integer()
        .positive()
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    payment_date: Joi.date()
        .required(),
});

module.exports = paymentSchema;