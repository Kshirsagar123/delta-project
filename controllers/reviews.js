const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
   let listing = await Listing.findById(id).populate("reviews");
   let newReview = new Review(req.body.review);
   newReview.author = req.user._id;
   listing.reviews.push(newReview);
   await newReview.save();
    await listing.save();
    req.flash("success", "Successfully added a new review!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;


    // 1️⃣ remove review reference from listing
    const listing = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    // 2️⃣ delete review
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted the review!");

    res.redirect(`/listings/${id}`);
  };
