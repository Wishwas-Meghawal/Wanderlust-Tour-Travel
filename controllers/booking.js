const Booking = require("../models/booking.js");


module.exports.getbooking = (req,res)=>{
    res.render("listing/book.ejs");
}

module.exports.booking = async(req,res)=>{
    const newBooking = new Booking(req.body.booking);
    // console.log(newBooking);
    await newBooking.save();
    req.flash("success","New booking Added")
    res.redirect("/listings");
};
