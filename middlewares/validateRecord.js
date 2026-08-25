const recordSchema = require("../schemas/recordSchema");

const validateRecord = (req, res, next) => {

    const { error, value } = recordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details
        });
    }
    else {
        next();
    }
};

module.exports = validateRecord;