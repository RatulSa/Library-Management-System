const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getToken,
    refreshToken
} = require("../controllers/userController");

const {authenticate, authorize } = require('../middlewares/auth.js');

const router = express.Router();

router.get("/",authenticate, authorize("Librarian"),getUsers);
router.get("/:id", getUserById);
router.post("/", authenticate, authorize("Librarian") , createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post('/getToken',getToken);
router.post('/refreshToken',refreshToken);

module.exports = router;
