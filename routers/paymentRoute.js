const express = require("express");
const {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} = require("../controllers/paymentController");
const {authenticate, authorize } = require('../middlewares/auth.js');


const router = express.Router();

router.get("/",authenticate, authorize('Librarian'), getPayments);
router.get("/:id", authenticate, authorize('Librarian'), getPaymentById);
router.post("/", authenticate, authorize('Librarian'), createPayment);
router.put("/:id", authenticate, authorize('Librarian'), updatePayment);
router.delete("/:id", authenticate, authorize('Librarian'), deletePayment);

module.exports = router;
