const { Record, User, BookCopy, Book } = require("../models");

const recordInclude = [
    {
        model: User,
        as: "user",
        attributes: ["uid", "name", "email"],
    },
    {
        model: BookCopy,
        as: "bookCopy",
        attributes: ["bid", "isbn", "status"],
        include: [
            {
                model: Book,
                as: "book",
                attributes: ["isbn", "bname", "author_name", "price"],
            },
        ],
    },
];

const getRecords = async (req, res, next) => {
    try {
        const records = await Record.findAll({
            include: recordInclude,
            order: [["id", "ASC"]],
        });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error) {
        next(error);
    }
};

const getRecordById = async (req, res, next) => {
    try {
        const record = await Record.findByPk(req.params.id, {
            include: recordInclude,
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};

const createRecord = async (req, res, next) => {
    try {
        const { uid, bid, issued_on, due_date } = req.body;

        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const bookCopy = await BookCopy.findByPk(bid);

        if (!bookCopy) {
            return res.status(404).json({
                success: false,
                message: "Book copy not found",
            });
        }

        if (bookCopy.status.toLowerCase() !== "available") {
            return res.status(409).json({
                success: false,
                message: "Book copy is not available",
            });
        }

        const record = await Record.create({
            uid,
            bid,
            issued_on,
            due_date,
            returned_on: null,
        });

        await bookCopy.update({
            status: "borrowed",
        });

        const createdRecord = await Record.findByPk(record.id, {
            include: recordInclude,
        });

        res.status(201).json({
            success: true,
            data: createdRecord,
        });
    } catch (error) {
        next(error);
    }
};

const updateRecord = async (req, res, next) => {
    try {
        const record = await Record.findByPk(req.params.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        const { issued_on, due_date, returned_on } = req.body;
        const updateData = {};

        if (issued_on !== undefined) updateData.issued_on = issued_on;
        if (due_date !== undefined) updateData.due_date = due_date;

        if (returned_on !== undefined) {
            updateData.returned_on = returned_on;

            if (returned_on !== null) {
                await BookCopy.update(
                    { status: "available" },
                    { where: { bid: record.bid } }
                );
            } else {
                await BookCopy.update(
                    { status: "borrowed" },
                    { where: { bid: record.bid } }
                );
            }
        }

        await record.update(updateData);

        const updatedRecord = await Record.findByPk(record.id, {
            include: recordInclude,
        });

        res.status(200).json({
            success: true,
            data: updatedRecord,
        });
    } catch (error) {
        next(error);
    }
};

const deleteRecord = async (req, res, next) => {
    try {
        const record = await Record.findByPk(req.params.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        if (record.returned_on === null) {
            await BookCopy.update(
                { status: "available" },
                { where: { bid: record.bid } }
            );
        }

        await record.destroy();

        res.status(200).json({
            success: true,
            message: "Record deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
};
