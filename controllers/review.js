//Require Listing Model
const Listing = require("../models/listing.js");

//Require Review Model
const Review = require("../models/review.js");


//exporting all the functions to be used in routes/review.js

//Create Review Route post route
module.exports.createReview = async(req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    
    res.redirect(`/listings/${listing._id}`);
};

//Delete Review Route
module.exports.deleteReview = async(req, res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};