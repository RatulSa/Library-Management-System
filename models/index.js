
const UserRole = require("./userRole");
const User = require("./user");
const Book = require("./books");
const BookCopy = require("./bookcopies");
const Record = require("./records");
const Payment = require("./payments");

// UserRole -> User
UserRole.hasMany(User, {
    foreignKey: "rid",
    as: "users",
});

User.belongsTo(UserRole, {
    foreignKey: "rid",
    as: "role",
});


// User -> Record
User.hasMany(Record, {
    foreignKey: "uid",
    as: "records",
});

Record.belongsTo(User, {
    foreignKey: "uid",
    as: "user",
});


// User -> Payment
User.hasMany(Payment, {
    foreignKey: "uid",
    as: "payments",
});

Payment.belongsTo(User, {
    foreignKey: "uid",
    as: "user",
});


// Book -> BookCopy
Book.hasMany(BookCopy, {
    foreignKey: "isbn",
    as: "copies",
});

BookCopy.belongsTo(Book, {
    foreignKey: "isbn",
    as: "book",
});


// BookCopy -> Record
BookCopy.hasMany(Record, {
    foreignKey: "bid",
    as: "records",
});

Record.belongsTo(BookCopy, {
    foreignKey: "bid",
    as: "bookCopy",
});


module.exports = {
    UserRole,
    User,
    Book,
    BookCopy,
    Record,
    Payment,
};