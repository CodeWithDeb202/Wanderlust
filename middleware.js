//Importing the listing model
const Listing = require("./models/listing");

//Require Review Model
const Review = require("./models/review.js");

//Require ExpressError
const ExpressError = require("./utils/ExpressError.js");

//Require Listing Schema & Review Schema
const { listingSchema, reviewSchema }  = require("./schema.js");



//Middleware for checking if the user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be loged in to for create a listing!");
        return res.redirect("/login");
    }
    next();
};

//Middleware for save the redirect url in locals
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


//Middleware for checking if the user is the owner of the listing or not
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error", "You don't have permission to edit or delete this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


//Middleware for validation
module.exports.validateListing = (req, res, next) => {
    const {error} = listingSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};


//Middleware for validation of review
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};


//Middleware for checking if the user is the author of the review or not
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash("error", "You don't have permission to edit or delete this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
