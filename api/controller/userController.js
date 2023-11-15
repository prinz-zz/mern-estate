import { errorMessage } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorMessage(401, "Unauthorized"));

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
