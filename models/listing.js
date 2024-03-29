const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchems = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    image: {
        url : String,
        filename :String,
    },
    price: Number,
    location : String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref : "Reviews"
        },
    ],
    
})


listingSchems.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingSchems);
module.exports = Listing;