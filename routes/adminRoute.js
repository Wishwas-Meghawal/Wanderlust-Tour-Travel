const express = require("express");
const admin_route = express.Router();
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js")
const {isLoggedIN, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const adminController = require("../controllers/admin.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");
const Booking = require("../models/booking");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const booking = require("../models/booking");
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
admin_route.get("/", wrapAsync(adminController.loadDashboard));

//new router
admin_route.get("/adminnew",(adminController.renderNewForm));

// show booking data

admin_route.get("/showbooking",(adminController.showbooking));

//show users

admin_route.get("/showusers",(adminController.showUsers));

// show contact

admin_route.get("/showcontact",(adminController.showContact))

//create router

admin_route.post("/" , upload.single('listing[image]'), validateListing, wrapAsync(adminController.createListing));

// edit route

admin_route.get("/:id/adminedit",wrapAsync(adminController.randerEditForm));

// listing delete

admin_route.delete("/:id",wrapAsync(adminController.destroylisting));

// boking delete
admin_route.delete("/showbooking/:id",wrapAsync(adminController.destroybooking));


// contact delete
admin_route.delete("/showcontact/:id",wrapAsync(adminController.destroycontact));

//update

admin_route.put("/:id",upload.single('listing[image]'),wrapAsync(adminController.updateListing));


    


admin_route.get("/adminabout",(req,res)=>{
    res.render("admin/adminabout.ejs");
});

// admin_route.get("*",(req,res)=>{
//     req.flash("error","404 page not found")
// })


// admin_route.post("/",adminController.verifyLogin);

// admin_route.get("/adminhome",adminController.loadDashboard);

module.exports = admin_route;