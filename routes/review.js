const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js")
const { isLoggedIn , validateReview, isReviewAuthor}= require("../middleware.js")
const { isReviewAuthorOrOwner } = require("../middleware");

const reviewController= require("../controllers/reviews.js");
//Reviews
//Post Review Route
router.post("/",  isLoggedIn("You must be logged in to post a review."), validateReview, wrapAsync(reviewController.createReview));


//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn("You must be logged in to delete a review."),
    isReviewAuthorOrOwner,
    wrapAsync(reviewController.destroyReview)
);

module.exports= router;