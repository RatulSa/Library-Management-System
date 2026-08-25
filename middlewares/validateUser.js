const userSchema = require("../schemas/userSchema");

const validateUser = (req, res, next) => {

    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details
        });
    }
    else {
        next();
    }
};

module.exports = validateUser;