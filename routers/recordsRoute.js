const express = require("express");
const {
    getRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
} = require("../controllers/recordsController");
const {authenticate, authorize } = require('../middlewares/auth.js');
const validateRecord = require("../middlewares/validateRecord");
const router = express.Router();

router.get("/",authenticate, authorize('Librarian'), getRecords);
router.get("/:id",authenticate, authorize('Librarian'), getRecordById);
router.post("/", authenticate, authorize('Librarian'),validateRecord,createRecord);
router.put("/:id", authenticate, authorize('Librarian'),validateRecord,updateRecord);
router.delete("/:id",authenticate, authorize('Librarian'), deleteRecord);

module.exports = router;
