//Require Mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;


//Define Review Schema
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});


//Define Review Model & Export Review Model
module.exports = mongoose.model("Review", reviewSchema);