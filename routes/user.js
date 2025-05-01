const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../middleware');


const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync(userController.signup));

router.route("/login")
.get( userController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login", // Redirect here if authentication fails
    failureFlash: true,  // Flash error message on failure
}), userController.login);

// Google OAuth Routes
router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username || "User"}!`);
        const redirectUrl = req.session.returnTo || "/listings";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }
);
 
// Profile Page
router.get('/profile', isLoggedIn(), (req, res) => {
    res.render('users/profile', { currUser: req.user });
});

// Dashboard Page
router.get('/dashboard', isLoggedIn(), (req, res) => {
    res.render('users/dashboard', { currUser: req.user });
});

router.get("/logout", userController.logout);
module.exports=router;