const User = require("../models/user.js");

module.exports.renderSignupForm=(req, res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res)=>{
    try {
        let {username, email, password}= req.body;
        const newUser = new User({email, username});
        const registeredUser =await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to YatraBnB, your gateway to unforgettable journeys!");
            res.redirect("/listings");
        });
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
   
};

module.exports.renderLoginForm=(req, res)=>{
    res.render("users/login.ejs")
};

module.exports.login = async (req, res) => {
    // Show a success message after a successful login
    req.flash("success", "Great to see you again at YatraBnB!");

    // Redirect to the URL stored in `res.locals.redirectUrl`, or fallback to the home page
    res.redirect(res.locals.redirectUrl || '/');
};

module.exports.logout=(req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        } 
        req.flash("success", "You’ve been logged out successfully.");

        res.redirect('/listings');
    });
};