const express = require("express");

const {
    getStatistics,
} = require("../controllers/statisticsController");
const {authenticate, authorize } = require('../middlewares/auth.js');



const router = express.Router();


router.get("/",authenticate,authorize('Librarian'), getStatistics);

module.exports = router;