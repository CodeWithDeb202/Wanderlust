const express = require('express');

//Require Router
const router = express.Router({mergeParams: true});

//Require WrapAsync
const wrapAsync = require("../utils/wrapAsync.js");

//Require Middlewares
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");

//Require Review Controller
const reviewControllers = require("../controllers/review.js");

//Require all the functions from reviewControllers to be used in routes/review.js

//Review
//Create Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));


//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.deleteReview));


//Export Review Router
module.exports = router;