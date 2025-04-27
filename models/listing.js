const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type : String,
        required: true,
    },
    description : String,
    image:{
        filename:String,
        url:{
            type : String,
        default:"https://a0.muscache.com/im/pictures/miso/Hosting-606321596888928150/original/1e808fd8-b1fc-4154-ba07-e9db8ed66967.jpeg?im_w=720",
        set: (v) => v === "" ? "https://www.freepik.com/free-photos-vectors/villa" : v,
        }
    },
    price:{
type: Number,
required:true,
    } ,
    location: String,
    country : String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;