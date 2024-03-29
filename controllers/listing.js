const Listing = require("../models/listing.js");
const Contact = require("../models/contact.js");
const Booking = require("../models/booking.js");

module.exports.index = async(req,res)=>{
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    let page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    const limit = 12;


    const allListing = await Listing.find({
        $or:[
            {title:{ $regex:'.*'+search+'.*',$options:'i'}},
            {country:{ $regex:'.*'+search+'.*',$options:'i'}},
            {location:{ $regex:'.*'+search+'.*',$options:'i'}},
        ]
    }).limit(limit * 1).skip((page - 1) * limit).exec();

    const count = await Listing.find({
        $or:[
            {title:{ $regex:'.*'+search+'.*',$options:'i'}},
            {country:{ $regex:'.*'+search+'.*',$options:'i'}},
            {location:{ $regex:'.*'+search+'.*',$options:'i'}},
        ]
    }).countDocuments();

    res.render("listing/index.ejs",{
        allListing,
        totalPages: Math.ceil(count/limit),
        currentpage: page
    }); 
};

// module.exports.renderNewForm = (req,res)=>{
//     res.render("listing/new.ejs");
// };

module.exports.showListing = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},});
    if(!listing){
        req.flash("error"," Listing you requested for does not exist")
    }
    res.render("listing/show.ejs",{listing});
};




//booking 
module.exports.book = async(req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/book.ejs",{listing});
    
}
module.exports.booking = async(req,res)=>{
    const newBooking = new Booking(req.body.booking);
    await newBooking.save();
    req.flash("success","Your Tour Successfuly Book ")
    res.redirect("/listings");
}

// about page

module.exports.about = async(req,res)=>{
    res.render("listing/about.ejs");
}



// module.exports.createListing = async(req,res,next)=>{
//     let url = req.file.path;
//     let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = {url, filename};
//     await newListing.save();
//     req.flash("success","New Listing created")
//     res.redirect("/listings");
// };

// module.exports.renderEditForm = async(req,res)=>{
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//     res.render("listing/edit.ejs",{listing});
// };

// module.exports.updateListing = async(req,res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     req.flash("success"," Listing Updated")
//     res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async(req,res)=>{
//     let{id} = req.params;
//     await Listing.findByIdAndDelete(id);
//     req.flash("success"," Listing Deleted")
//     res.redirect("/listings");
// };