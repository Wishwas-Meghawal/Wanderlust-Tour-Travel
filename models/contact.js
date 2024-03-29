const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchems = new Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})
const Contact = mongoose.model("Contact",contactSchems);
module.exports = Contact;
