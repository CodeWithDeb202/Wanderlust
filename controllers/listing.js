//Require Listing Model
const Listing = require("../models/listing.js");

//Require ExpressError
const ExpressError = require("../utils/ExpressError.js");



//Exporting all the functions to be used in routes/listing.js


const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

//Index Route For wanderlust
module.exports.index = async (req, res) =>{
    const { category, country } = req.query;
    const searchCountry = country ? country.trim() : "";
    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (searchCountry) {
        filter.country = { $regex: escapeRegex(searchCountry), $options: "i" };
    }

    const allListing = await Listing.find(filter);
    res.render("./listings/index.ejs", {allListing, selectedCategory: category, searchCountry});
};

//New Route
module.exports.renderNewForm = (req, res) =>{
    res.render("./listings/new.ejs");
};

//Show Route
module.exports.showRoute = async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        "path": "review", 
        populate: {
            path: "author",
        }
    })
    .populate("owner");
    
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
};

//Create Route
module.exports.createRoute = async (req, res, next) => {
    if (!req.file) {
        throw new ExpressError("Please upload a listing image.", 400);
    }

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listings");
};

//Edit route
module.exports.renderEditForm = async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image && listing.image.url ? listing.image.url : "";
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
};

//Update Route
module.exports.updateRoute = async(req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

//Delete Route
module.exports.deleteRoute = async(req, res) =>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted successfully!");
    res.redirect('/listings');
};
