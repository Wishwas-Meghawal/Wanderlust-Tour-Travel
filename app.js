if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate  = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/adminRoute.js");
const contactRouter = require("./routes/contact.js");





const wrapasync = require('./utils/wrapasync.js');
const Listing = require('./models/listing.js');
const { log } = require('console');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


// const dbUrl = process.env.ATLASDB_URL;




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

const sessionOptions ={
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        express: Date.now() +7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,  
    },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser",async(req, res)=>{
//     let fakeUser = new User({
//         email : "wishwas@gmail.com",
//         username : "Gojo Satoru",
//     });
//     let registeredUser = await User.register(fakeUser,"Showyamato");
//     res.send(registeredUser);
// });


// connection

main().then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.render("listing/home.ejs");
})

// Route

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/admin",adminRouter);
app.use("/contact",contactRouter);








//error
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found !"))
// })

app.use((err,req,res,next)=>{
    let{statusCode= 500 , message= "something want wrong"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message})
});
// app listen 
app.listen(8080,()=>{
    console.log("Server is listening  to port 8080");
})
