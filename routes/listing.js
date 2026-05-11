const express = require('express');

//Require Router
const router = express.Router();

//Require WrapAsync
const wrapAsync = require("../utils/wrapAsync.js");

//Require Middlewares
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


//Require controllers
const listingControllers = require("../controllers/listing.js");

//Require Multer and Cloudinary for image upload
const multer  = require('multer')

//Require Cloudinary and Storage from cloudConfig.js
const { cloudinary, storage } = require("../cloudConfig.js");

//Configure Multer Storage
const upload = multer({ storage: storage })


//Require all the functions from listingControllers to be used in routes/listing.js

//Routes combining as same router
router.route("/")
    //Index Route For wanderlust
    .get(wrapAsync(listingControllers.index))

    //Create Route For Wanderlust
    .post(isLoggedIn, upload.single("listing[image]"), validateListing ,  wrapAsync(listingControllers.createRoute))

//New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

//Routes are combiming as same router
router.route("/:id")
    //Show Route
    .get( wrapAsync(listingControllers.showRoute))

    //Update Route
    .put( isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.updateRoute))

    //Delete Route
    .delete( isLoggedIn, isOwner, wrapAsync(listingControllers.deleteRoute));


//Edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));


//Export Listing Router
module.exports = router;