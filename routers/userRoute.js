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

const validateUser = require("../middlewares/validateUser");
const validateLogin = require("../middlewares/validateLogin");

const {authenticate, authorize } = require('../middlewares/auth.js');


const router = express.Router();

router.get("/",authenticate, authorize("Librarian"),getUsers);
router.get("/:id", getUserById);
router.post("/", authenticate, authorize("Librarian") , validateUser,createUser);
router.put("/:id", authenticate, authorize("Librarian"),validateUser,updateUser);
router.delete("/:id", authenticate, authorize("Librarian"),deleteUser);

router.post('/getToken',validateLogin,getToken);
router.post('/refreshToken',refreshToken);

module.exports = router;
