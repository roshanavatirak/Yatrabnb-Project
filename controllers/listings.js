const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

const mongoose = require("mongoose");

module.exports.index = async(req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const sort = req.query.sort || "newest";
    const filterRating = req.query.rating || ''; // Get rating from query
  
    let sortOption;
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "most_liked":
        sortOption = { likes: -1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }
  
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
        match: filterRating ? { rating: parseInt(filterRating) } : {}, // Apply filter
        options: { sort: sortOption },
      })
      .populate("owner");
  
    if (!listing) {
      req.flash("error", "Oops! The listing does not exist.");
      return res.redirect("/listings");
    }
  
    res.render("listings/show", { listing, sort, filterRating, currUser: req.user });
  };
  


module.exports.createListing = async (req, res, next) => {
    // Check if listing data is present
    if (!req.body.listing) {
       
        return res.status(400).render("error", {
            err: { message: "Send valid data for listings" }
        });
    }

    // Ensure image is uploaded
    if (!req.file) {
        
        return res.status(400).render("error", {
            err: { message: "Image is required." }
        });
    }

    
    // Extract values
    const { title, description, price, country, location } = req.body.listing;
    const imageUrl = req.file.path;  // Cloudinary URL
    const imageFilename = req.file.filename;  // Cloudinary filename (public ID)

    // Validate the other fields
    if (!title || !description || !price || !country || !location) {
       
        return res.status(400).render("error", {
            err: { message: "All fields are required: Title, Description, Price, Country, and Location." }
        });
    }

   
    // Create new listing object
    const newListing = new Listing({
        title,
        description,
        price,
        country,
        location,
        image: { url: imageUrl, filename: imageFilename },  // Store image URL and filename
        owner: req.user._id
    });

    // Save the new listing to MongoDB
    await newListing.save();

    // Fetch the saved listing to verify data was stored correctly
    const savedListing = await Listing.findById(newListing._id);
    
    // Send success message and redirect
    req.flash("success", "Your listing has been successfully created!");
    res.redirect("/listings");
};



module.exports.renerEditForm = async (req, res) =>{
    
    let {id} = req.params;
    id = id.trim();
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Oops! The listing does not exist.");
        res.redirect("/listings");
     }
     const lowResUrl = listing.image.url.replace('/upload/', '/upload/q_50/');

    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).render("listings/edit.ejs", { listing: {}, error: "Invalid Listing ID!" });
    }

    const existingListing = await Listing.findById(id);
    if (!existingListing) {
        return res.status(404).render("listings/edit.ejs", { listing: {}, error: "Listing not found!" });
    }

    if (!req.body.listing) {
        return res.status(400).render("listings/edit.ejs", { listing: existingListing, error: "No data provided!" });
    }

    let { listing } = req.body;
    const requiredFields = ["title", "description"];
    for (let field of requiredFields) {
        if (listing[field] !== undefined && listing[field].trim() === "") {
            return res.status(400).render("listings/edit.ejs", { listing: existingListing, error: `${field} cannot be empty!` });
        }
    }

    // ✅ Construct update data
    let updateData = {};
    if (listing.title) updateData.title = listing.title.trim();
    if (listing.description) updateData.description = listing.description.trim();
    if (listing.price) updateData.price = listing.price;
    if (listing.country) updateData.country = listing.country;
    if (listing.location) updateData.location = listing.location;

    // ✅ If a new image is uploaded, update image field
    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    

    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedListing) {
        return res.status(404).render("listings/edit.ejs", { listing: existingListing, error: "Listing not found after update!" });
    }

   
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}?success=Listing updated successfully!`);
};


module.exports.destroyListing = async (req, res) =>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};