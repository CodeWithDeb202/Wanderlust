//Reqired mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

//Require passport local mongoose
const passportLocalMongoose = require("passport-local-mongoose").default;


//Define User Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});


//Apply passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

//Define User Model & Export User Model
module.exports = mongoose.model("User", userSchema);
