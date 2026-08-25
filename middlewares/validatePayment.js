const paymentSchema = require("../schemas/paymentSchema");

const validatePayment = (req, res, next) => {

    const { error, value } = paymentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details
        });
    }
    else {
        next();
    }
};

module.exports = validatePayment;