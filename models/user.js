const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

