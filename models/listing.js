//Reqired mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

//Require Review Model
const Review = require("./review.js");


//Define Listing Schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    category: 
        {
            type: String,
            enum: ["Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Beach", "Arctic", "Farms"],
            required: true
        }
});


//Delete Reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing.review.length){
        await Review.deleteMany({_id: {$in: listing.review}});
    }
});



//Define Listing Model
const Listing = mongoose.model("Listing", listingSchema);

//Export Listing Model
module.exports = Listing;