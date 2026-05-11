const express = require('express');

//Require WrapAsync function
const wrapAsync = require('../utils/wrapAsync.js');

//Require Router
const router = express.Router();

//Require Passport
const passport = require("passport");

//Require Middleware for save the redirect url in locals
const { saveRedirectUrl } = require('../middleware.js');

//require User Controller
const userControllers = require('../Controllers/user.js');


//Require all the functions from userControllers to be used in routes/user.js

//Routes combining as same router
router.route("/signup")
    //Define get Request for Sign-Up
    .get(userControllers.getSignup)

    //Define post Request for Sign-up
    .post(wrapAsync(userControllers.postSignup));

//Routes combining as same router
router.route("/login")
    //Define get Request for Login
    .get(userControllers.getLogin)

    //Define post Request for Login
    .post(saveRedirectUrl, passport.authenticate("local", { 

        failureFlash: true, 
        failureRedirect: "/login"
    }), 
    wrapAsync(userControllers.postLogin)
);

//Define get Request for Logout
router.get("/logout", userControllers.getLogout);


//export user router
module.exports = router;