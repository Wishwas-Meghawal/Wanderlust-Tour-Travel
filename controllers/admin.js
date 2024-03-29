const user = require("../models/user");
const passport = require("passport");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const contact = require("../models/contact");
const Contact = require("../models/contact");

// show tour data
module.exports.loadDashboard = async(req,res)=>{
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

    res.render("admin/adminhome.ejs",{
        allListing,
        totalPages: Math.ceil(count/limit),
        currentpage: page
    }); 
};

// show bookings
 
module.exports.showbooking = async(req,res)=>{
    const allbooking = await Booking.find({});
    res.render("admin/showbooking.ejs",{allbooking});
};


// show users

module.exports.showUsers = async(req,res)=>{
    const allUsers = await user.find({});
    res.render("admin/showuser.ejs",{allUsers});
}

// show contacts

module.exports.showContact = async(req,res)=>{
    const allContact = await contact.find({});
    res.render("admin/showcontact.ejs",{allContact});
}

//create form rander

module.exports.renderNewForm = (req,res)=>{
    res.render("admin/adminnew.ejs");
};

// create new listing

module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success","New Listing created")
    res.redirect("/admin");
}

//edit
module.exports.randerEditForm = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_300")
    res.render("admin/adminedit.ejs",{listing,originalImageUrl});
}
//delete
module.exports.destroylisting = async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted")
    res.redirect("/admin");
};
// delete booking
module.exports.destroybooking = async(req,res)=>{
    let{id} = req.params;
    await Booking.findByIdAndDelete(id);
    req.flash("success"," Booking Deleted")
    res.redirect("/admin");
};
// delete contact
module.exports.destroycontact = async(req,res)=>{
    let{id} = req.params;
    await Contact.findByIdAndDelete(id);
    req.flash("success"," Contact Deleted")
    res.redirect("/showcontact.ejs");
};

//update
module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success"," Listing Updated")
    res.redirect("/admin");
};


//verify login

// module.exports.verifyLogin = async(req,res)=>{
//     try{
//         const username = req.body.username;
//         const password = req.body.password;
//         const userData = await user.findOne({username:username});

//         if(userData){
//             const passwordMatch = await bcrypt.compare(password,userData.password);

//             if(passwordMatch){
//                 if(userData.is_admin === 0){
//                     req.flash("error","Username or password in correct")
//                     res.render("admin/login.ejs");
//                 }
//                 else{
//                     res.redirect("/admin/adminhome")
//                 }
//             }
//             else{
//                 req.flash("error","Username or password in correct")
//                 res.render("admin/login.ejs");
//             }
//         }
//         else{
//             req.flash("error","Username or password in correct")
//             res.render("admin/login.ejs");
//         }
//     }
//     catch(e){
//         req.flash("error",e.message);
//     }
// };

// module.exports.loadDashboard = async(req,res)=>{
//     try{
//         res.render("admin/adminhome.ejs");
//     }
//     catch(e){
//         req.flash("error",e.message);
//     }
// }