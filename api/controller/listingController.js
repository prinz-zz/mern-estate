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

  if (req.user.id !== listing.userRef) {
    return next(errorMessage(401, "You can only delete your own listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

/////////////////////////updateListing////////////////
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorMessage(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorMessage(401, "You can only update your own listing"));
  }

  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(listing);
    res.status(200).json("Listing has been Updated");
  } catch (error) {
    next(error);
  }
};

/////////////////getListing//////////////
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorMessage(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

/////////////////////getListings////////////////
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }

    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
