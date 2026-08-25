const bookSchema = require("../schemas/bookSchema");

const validateBook = (req, res, next) => {

    const { error, value } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details
        });
    }
    else {
        next();
    }
};

module.exports = validateBook;