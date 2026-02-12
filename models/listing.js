const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    
    title : {type: String, required: true},
    description : String,
    image: {
      url : String,
      filename : String,
    // type: String,
    // default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    // set: (v) =>
    //   v === ""
    //     ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    //     : v,
},


    price : Number,
    location : String,
    country : String,
    reviews : [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
  ],  owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

listingSchema.post('findOneAndDelete', async function (listing) {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;