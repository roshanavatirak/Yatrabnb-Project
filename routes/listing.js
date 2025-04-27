const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js")
const mongoose = require("mongoose");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");


const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn("Please log in to create a new listing."),
        upload.single('listing.image'),
        validateListing,
        wrapAsync(listingController.createListing)
    );


//New Route
router.get("/new", isLoggedIn("Please log in to create a new listing."), listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn("Please log in to update this listing."), isOwner,  upload.single('listing.image'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn("Please log in to delete this listing."), isOwner,wrapAsync(listingController.destroyListing));






//Edit Route
router.get("/:id/edit",isLoggedIn("Please log in to edit this listing."),isOwner,  wrapAsync(listingController.renerEditForm));






module.exports = router;