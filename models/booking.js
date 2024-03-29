const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
    {
      userID:{
        type: Schema.Types.ObjectId,
        ref : "User"
      },
      fullName: {
        type: String,
        required: true,
      },

      userEmail: {
        type: String,
        required: true,
      },
      
      guestSize: {
        type: Number,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      price: Number,
      location : String,
      country: String,
    },
  );

module.exports = mongoose.model("Booking",bookingSchema);