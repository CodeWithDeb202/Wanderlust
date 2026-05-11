//Require User Model
const User = require("../models/user.js");



//get Request for Sign-Up Route
module.exports.getSignup = (req, res) => {
    res.render("users/signup.ejs");
};

//post Request for Sign-Up Route
module.exports.postSignup = async (req, res, next) => {
    try{
        let{email, username, password} = req.body;
        const newUser = new User({email, username});
    
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
};

//get Request for Login Route
module.exports.getLogin = (req, res) => {
    res.render("users/login.ejs");
};

//post Request for Login Route
module.exports.postLogin = async (req, res) => {
    req.flash("success", "Welcome Back! to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//get Request for Logout Route
module.exports.getLogout = (req, res, next) => {
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings");
    });
    
};