const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().uri().required(),  // Image URL should be valid URI (Cloudinary URL)
            filename: Joi.string().optional()   // Filename is optional, we store it but don't need to validate it
        }).optional() // Allow the image object to be optional, it will be added from Multer
    }).required()
});

module.exports.reviewSchema= Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});
