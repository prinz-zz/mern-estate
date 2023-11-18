import { errorMessage } from "../utils/error.js";
import Listing from "../models/listingModel.js";

//////////////////////Create Listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//////////////////////Delete Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorMessage(404, "Listing not found"));
  }

  if(req.user.id !== listing.userRef) {
    return next(errorMessage(401, "You can only delete your own listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted');
  } catch (error) {
    next(error);
  }

};
