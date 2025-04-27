const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (customMessage) => {
    
    return (req, res, next) => {
       
        if (!req.isAuthenticated()) {
            req.session.redirectUrl= req.originalUrl;
            req.flash("error", customMessage || "You must be logged in.");
            return res.redirect("/login");
        }
        next();
    };
};

module.exports.isAdmin = (req, res, next) => {
    if (res.locals.currUser?.role !== 'admin') {
        req.flash("error", "Admin access only.");
        return res.redirect("back");
    }
    next();
};


// module.exports.saveRedirectUrl=(req, res, next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl=req.session.redirectUrl;
//     }
//     next();
// };

module.exports.saveRedirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectUrl || "/listings"; // default fallback
    next();
};

// module.exports.isOwner= async(req, res, next)=>{
//     let {id} = req.params;
//     let listing = await Listing.findById(id);

//     // Use res.locals.currUser instead of currUser
//     if (!res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id)) {
//         req.flash("error", "You don't have permission to edit");
//         return res.redirect(`/listings/${id}`);
//     }
// }

module.exports.isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        // Check if listing exists
        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        const currUser = res.locals.currUser;
        
        // Check if user is logged in and either the owner or an admin
        const isOwner = listing.owner._id.equals(currUser._id);
        const isAdmin = currUser?.role === 'admin';

        if (!currUser || (!isOwner && !isAdmin)) {
            let action = req.method === "DELETE" 
                ? "delete" 
                : req.method === "PUT" 
                    ? "update" 
                    : "edit";

            req.flash("error", `Only the owner or an admin can ${action} this listing.`);
            return res.redirect(`/listings/${id}`);
        }

        // Store listing in req for future use
        req.listing = listing;

        next();
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while checking permissions.");
        res.redirect("/listings");
    }
};


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body); // ✅ Correct syntax

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", "); // ✅ Corrected variable name
        throw new ExpressError(400, errMsg); // ✅ Throws custom error with correct message
    } else {
        next(); // ✅ Proceed to the next middleware if no validation errors
    }
};

module.exports.validateReview = (req, res, next) => {
    console.log("🔥 validateReview middleware triggered.");
    console.log("📦 Incoming review data:", req.body);
    
    const { error } = reviewSchema.validate(req.body); // ✅ Correct syntax

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", "); // ✅ Corrected variable name
        throw new ExpressError(400, errMsg); // ✅ Throws custom error with correct message
    } else {
        next(); // ✅ Proceed to the next middleware if no validation errors
    }
};

// module.exports.isReviewAuthor= async(req, res, next)=>{
//     let {id, reviewId} = req.params;
//     let review = await Review.findById(reviewId);

//     // Use res.locals.currUser instead of currUser
//     if (!res.author.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not author of this review");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);
    const listing = await Listing.findById(id);

    if (!review || !listing) {
        req.flash("error", "Review or listing not found.");
        return res.redirect("/listings");
    }

    const userId = req.user?._id;

    const isAuthor = review.author.equals(userId);
    const isHost = listing.owner.equals(userId);

    if (!isAuthor && !isHost) {
        req.flash("error", "You don't have permission to delete this review.");
        return res.redirect(`/listings/${id}`);
    }

    next(); // User is either the review author or listing host
};


module.exports.isReviewAuthorOrOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        const listing = await Listing.findById(id);

        if (!review || !listing) {
            req.flash("error", "Review or listing not found.");
            return res.redirect("/listings");
        }

        const currUser = res.locals.currUser;
        const currUserId = currUser?._id;
        const role = currUser?.role;

        const isAuthor = review.author.equals(currUserId);
        const isOwner = listing.owner.equals(currUserId);
        const isAdmin = role === 'admin';

        if (!isAuthor && !isOwner && !isAdmin) {
            req.flash("error", "Only the review author, listing owner, or an admin can delete this review.");
            return res.redirect(`/listings/${id}`);
        }

        // Store for later use if needed
        req.review = review;
        req.listing = listing;

        next();
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while checking permissions.");
        return res.redirect(`/listings/${id}`);
    }
};
