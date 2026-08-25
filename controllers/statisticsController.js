const { User, Book, BookCopy, Record } = require("../models");
const { Op, fn, col, literal } = require("sequelize");
const sequelize = require("../config/db");

const getStatistics = async (req, res, next) => {
    try {

        
        // 1. TOTAL USERS

        const totalUsers = await User.count();


        
        // 2. TOTAL BOOKS
       

        const totalBooks = await Book.count();


        // 3. TOTAL LENT BOOKS

        const totalLentBooks = await BookCopy.count({
            where: {
                status: "borrowed",
            },
        });


        // 4. HIGHEST LENT BOOK
        

        const highestLentBook = await Record.findOne({
    attributes: [
        [sequelize.col("bookCopy->book.isbn"), "isbn"],
        [sequelize.col("bookCopy->book.bname"), "bname"],
        [sequelize.col("bookCopy->book.author_name"), "author_name"],
        [
            sequelize.fn(
                "COUNT",
                sequelize.col("Record.bid")
            ),
            "lent_count"
        ]
    ],

    include: [
        {
            model: BookCopy,
            as: "bookCopy",
            attributes: [],

            include: [
                {
                    model: Book,
                    as: "book",
                    attributes: []
                }
            ]
        }
    ],

    group: [
        "bookCopy.isbn",
        "bookCopy->book.isbn",
        "bookCopy->book.bname",
        "bookCopy->book.author_name"
    ],

    order: [
        [sequelize.literal("lent_count"), "DESC"]
    ],

    subQuery: false
});


        
    // 5. MOST ACTIVE USER

    const mostActiveUser = await User.findOne({
        attributes: [
            "uid",
            "name",
            "email",
            "login_count",
        ],
        order: [
            ["login_count", "DESC"],
        ],
    });


        // SELECT
        //     "uid",
        //     "name",
        //     "email",
        //     "login_count"
        // FROM "Users"
        // WHERE "login_count" = (
        // SELECT MAX("login_count")
        // FROM "Users"
        // );

        // // ==========================================
        // // 6. OLDEST BOOK
        // // ==========================================

        // const oldestBook = await Book.findOne({
        //     order: [["createdAt", "ASC"]],
        // });


        // // ==========================================
        // // 7. NEWEST BOOK
        // // ==========================================

        // const newestBook = await Book.findOne({
        //     order: [["createdAt", "DESC"]],
        // });


        // 8. MOST AVAILABLE BOOK

const mostAvailableBook = await BookCopy.findOne({
    attributes: [
        "isbn",
        [
            fn("COUNT", col("BookCopy.isbn")),
            "available_count",
        ],
    ],

    where: {
        status: "available",
    },

    include: [
        {
            model: Book,
            as: "book",
            attributes: [
                "isbn",
                "bname",
                "author_name",
                "subject",
            ],
        },
    ],

    group: [
        "BookCopy.isbn",
        "book.isbn",
        "book.bname",
        "book.author_name",
        "book.subject",
    ],

    order: [
        [literal("available_count"), "DESC"],
    ],

    subQuery: false,
});




        res.status(200).json({
            success: true,

            data: {
                highestLentBook,
                mostActiveUser,
                mostAvailableBook,
                totalUsers,
                totalBooks,
                totalLentBooks,
            },
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getStatistics,
};