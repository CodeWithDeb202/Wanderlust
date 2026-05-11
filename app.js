//Require Dotenv
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ quiet: true });
}


//Require Express
const express = require("express");
const app = express();


//Define Port
const port = process.env.PORT || 3000;

//Require Path for Ejs
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

//Require Methode Override Path
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


//Require EJS_MATE 
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);


//Require ExpressError
const ExpressError = require("./utils/ExpressError.js");


//Require All Routes
//Require Listing Routes
const listingRouter = require("./routes/listing.js");

//Require Review Routes
const reviewRouter = require("./routes/review.js");

//Require User Routes
const userRouter = require("./routes/user.js");


//Require Express Session
const session = require("express-session");

//Require mongoStore
const { MongoStore } = require("connect-mongo");


//Require passport
const passport = require("passport");

//Require Passport Local Strategy
const LocalStrategy = require("passport-local");

//Require User Model
const User = require("./models/user.js");



//Use Static File and path for styling and more functionality
app.use(express.static(path.join(__dirname, "/public")));


//Require Mongoose
const mongoose = require("mongoose");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;



//Connected To DB
main().then(() => {
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
});

//Define connection of DB
async function main() {
    await mongoose.connect(dbUrl);
}


//Define Mongo Store Session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in mongo session store", err)
})

//Define SessionOptions
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
};


//Use Session
app.use(session(sessionOptions));

//Use Flash
app.use((req, res, next) => {
    req.flash = (type, msg) => {
        req.session.flash = req.session.flash || {};

        if (msg) {
            req.session.flash[type] = req.session.flash[type] || [];
            req.session.flash[type].push(msg);
            return req.session.flash[type];
        }

        const messages = req.session.flash[type] || [];
        delete req.session.flash[type];
        return messages;
    };

    next();
});

//Use Passport
//1st of all we need to initialize passport.
app.use(passport.initialize());

//2nd we need to use passport.session() to use persistent login sessions.
app.use(passport.session());

//Use Local Strategy
passport.use(new LocalStrategy(User.authenticate()));

//Use serialize and deserialize user for session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Middleware for flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});




//Use Listing Routes
app.use("/listings", listingRouter);

//Use Review Routes
app.use("/listings/:id/reviews", reviewRouter);

//Use User Routes
app.use("/", userRouter);



//Deafault Route Or Connection

//If No Route Found Then It Will Show 404 Error
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found!!", 404));
});

//Coustom error handler middleware
app.use((err, req, res, next) => {
    let {message="Something went wrong!", statusCode=500} = err;
    res.status(statusCode).render("./error.ejs" , {message});
});

//Listen To Port
app.listen(port, () => {
    console.log(`http://localhost:${port}/listings`);
});
