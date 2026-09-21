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

const forgotPassword = require("../controllers/forgetPasswordController.js")
const { resetPassword } = require("../controllers/resetPasswordController");

const validateUser = require("../middlewares/validateUser");
const validateLogin = require("../middlewares/validateLogin");

const {authenticate, authorize } = require('../middlewares/auth.js');


const router = express.Router();

// router.get("/",authenticate, authorize("Librarian"),getUsers);
router.get("/",getUsers);

router.get("/:id", getUserById);
// router.post("/", authenticate, authorize("Librarian") , validateUser,createUser);
router.post("/",validateUser,createUser);

router.put("/:id", authenticate, authorize("Librarian"),validateUser,updateUser);
router.delete("/:id", authenticate, authorize("Librarian"),deleteUser);

router.post('/getToken',validateLogin,getToken);
router.post('/refreshToken',refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
