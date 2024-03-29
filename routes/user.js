const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users")

//signup form
router.get("/signup",userController.rendersignUpForm);


// signup route
router.post("/signup", wrapasync(userController.signUp));


//login form
router.get("/login",userController.renderLoginForm);

//login rout
router.post("/login", saveRedirectUrl ,passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}), userController.login);

//logout
router.get("/logout",userController.logout);





module.exports = router;