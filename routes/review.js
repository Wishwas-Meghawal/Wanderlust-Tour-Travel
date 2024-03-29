const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIN, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}



// Reviews
//review post route
router.post("/", isLoggedIN ,validateReview,wrapAsync(reviewController.createReview));

// review delete  route

router.delete("/:reviewId", isLoggedIN,isReviewAuthor,wrapAsync(reviewController.destroyReviews));

module.exports = router;