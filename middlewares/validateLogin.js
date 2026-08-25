const loginSchema = require("../schemas/loginSchema");

const validateLogin = (req, res, next) => {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details
        });
    }
    else {
        next();
    }
};

module.exports = validateLogin;