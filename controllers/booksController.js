const { Op } = require("sequelize");
const { Book, BookCopy } = require("../models");

const getBooks = async (req, res, next) => {
    try {
        const {
            search,
            subject,
            status,
            sort = "isbn",
            order = "asc",
        } = req.query;

        const where = {};

        if (subject) {
            where.subject = {
                [Op.iLike]: subject,
            };
        }

        if (search) {
            where[Op.or] = [
                { bname: { [Op.iLike]: `%${search}%` } },
                { author_name: { [Op.iLike]: `%${search}%` } },
                { isbn: { [Op.iLike]: `%${search}%` } },
                { subject: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // if (minPrice !== undefined || maxPrice !== undefined) {
        //     where.price = {};
        //     if (minPrice !== undefined) where.price[Op.gte] = minPrice;
        //     if (maxPrice !== undefined) where.price[Op.lte] = maxPrice;
        // }

        const copyInclude = {
            model: BookCopy,
            as: "copies",
            attributes: ["bid", "isbn", "status"],
        };

        if (status) {
            copyInclude.where = {
                status: { [Op.iLike]: status },
            };
        }

        const allowedSortFields = ["isbn", "bname", "author_name", "price"];
        const sortField = allowedSortFields.includes(sort) ? sort : "isbn";
        const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

        const books = await Book.findAll({
            where,
            include: [copyInclude],
            order: [[sortField, sortOrder]],
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books,
        });
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const book = await BookCopy.findByPk(id, {
            include: {
                model: Book,
                as: "book",
                attributes: [ "bname","author_name"],
            },
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const {
            isbn,
            bname,
            author_name,
            price,
            copies = [],
        } = req.body;

        const existingBook = await Book.findByPk(isbn);

        if (existingBook) {
            return res.status(409).json({
                success: false,
                message: "Book with this ISBN already exists",
            });
        }

        const book = await Book.create({
            isbn,
            bname,
            author_name,
            price,
        });

        if (copies.length > 0) {
            await BookCopy.bulkCreate(
                copies.map((status) => ({
                    isbn: book.isbn,
                    status,
                }))
            );
        }

        const createdBook = await Book.findByPk(isbn, {
            include: {
                model: BookCopy,
                as: "copies",
                attributes: ["bid", "isbn", "status"],
            },
        });

        res.status(201).json({
            success: true,
            data: createdBook,
        });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        const { bname, author_name, price } = req.body;
        const updateData = {};

        if (bname !== undefined) updateData.bname = bname;
        if (author_name !== undefined) updateData.author_name = author_name;
        if (price !== undefined) updateData.price = price;

        await book.update(updateData);

        const updatedBook = await Book.findByPk(book.isbn, {
            include: {
                model: BookCopy,
                as: "copies",
                attributes: ["bid", "isbn", "status"],
            },
        });

        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        await book.destroy();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
