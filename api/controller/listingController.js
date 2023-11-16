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
