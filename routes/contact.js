const express = require("express");
const contact_router = express.Router();
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIN, isOwner} = require("../middleware.js");
const contactController = require("../controllers/contact.js")
const Contact = require("../models/contact.js");

contact_router.get("/",isLoggedIN,(contactController.contact));

contact_router.post("/",isLoggedIN,wrapAsync(contactController.createContact));

module.exports = contact_router;