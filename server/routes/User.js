


const express = require("express");
const router = express.Router();

const { changePassword, login, signup, sendOTP,}  = require("../controllers/Auth");
const {resetPasswordToken, resetPassword } =require("../controllers/ResetPassword")
const { auth } = require("../middlewares/auth")

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendOTP);
router.put("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;