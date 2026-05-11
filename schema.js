//Require Joi for validation
const joi = require('joi');

//Exporting the listingSchema for validation in middleware
module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        category: joi.string().valid("Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Beach", "Arctic", "Farms").required(),
        image: joi.string().allow("", null)
    }).required()
});


//Exporting the reviewSchema for validation in middleware
module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
});
