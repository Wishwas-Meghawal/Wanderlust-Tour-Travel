const Contact = require("../models/contact.js");

// contact form rander
module.exports.contact = (req,res)=>{
    res.render("listing/contact.ejs");
}
//create contact

module.exports.createContact = async(req,res)=>{
    const contact = new Contact(req.body.contact);
    try{
        await contact.save();
        req.flash("success","Your Query Successfuly Send ")
        res.redirect("/listings");
    }
    catch(error){
        req.flash(error.message);
    }
    
    
}