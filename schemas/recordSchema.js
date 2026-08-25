const Joi = require("joi");

const recordSchema = Joi.object({
    uid: Joi.number()
        .integer()
        .positive()
        .required(),

    bid: Joi.number()
        .integer()
        .positive()
        .required(),

    issue_date: Joi.date()
        .required(),

    return_date: Joi.date()
        .greater(Joi.ref("issue_date"))
        .allow(null),
});

module.exports = recordSchema;