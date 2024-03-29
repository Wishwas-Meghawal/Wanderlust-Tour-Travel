const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Contact = require("../models/contact.js");
const Booking = require("../models/booking.js");
const {isLoggedIN, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}


//index.route
router.get("/", wrapAsync(listingController.index));




//about route
router.get("/about",(listingController.about));


//booking

router.get("/:id/book",isLoggedIN,(listingController.book));

router.post("/",isLoggedIN,wrapAsync(listingController.booking));

//show route
router.get("/:id",wrapAsync(listingController.showListing));




// create route
// router.post("/" , isLoggedIN, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
//

//  edit route

// router.get("/:id/edit", isLoggedIN , isOwner , wrapAsync(listingController.renderEditForm));

//  update rout

// router.put("/:id", isLoggedIN , isOwner ,validateListing,wrapAsync(listingController.updateListing));

//  delete route
// router.delete("/:id", isLoggedIN , isOwner ,wrapAsync(listingController.destroyListing));

module.exports = router;