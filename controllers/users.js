const user = require("../models/user");



module.exports.rendersignUpForm = (req,res)=>{
    res.render("users/signup.ejs")
};


module.exports.signUp = async(req,res)=>{
    try {
        let {username,email,mobile,is_admin=0,password} = req.body;
        let newUser = new user({username,email,mobile,is_admin});
        const registeredUser = await user.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welocme To WanderLust  😊")
            res.redirect("/listings");
        });
       
    } 
    catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome Back To WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged You Out!");
        res.redirect("/listings");
    });
};