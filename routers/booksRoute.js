const express = require("express");
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/booksController");

const {authenticate, authorize } = require('../middlewares/auth.js');


const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
//only librarian can create , delete , update books 
router.post("/", authenticate, authorize('Librarian'), createBook);
router.put("/:id", authenticate, authorize('Librarian'), updateBook);
router.delete("/:id",authenticate, authorize('Librarian'),  deleteBook);

module.exports = router;
