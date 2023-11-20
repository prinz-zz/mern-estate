import { errorMessage } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

///////////////UPDATE USER
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorMessage(401, "You can only update your own account "));
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

///////////////DELETE USER
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorMessage(401, "You can only delete your own account "));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("jwt_access");
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

////////////////////////////getUserListings/////////////////
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorMessage(401, "You can only view your own listings "));
  }
};

//////////////////getUser////////////////////////
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorMessage(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
