import jwt from "jsonwebtoken";
import { errorMessage } from "./error.js";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  let token;
  
  // read JWT from cookie
  token = req.cookies.jwt_access;


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();

    } catch (error) {
      return next(errorMessage(403, "Invalid Token"));
    }

  } else {
    return next(errorMessage(401, "Unauthorized, No Token"));
  }
  
}

//access cookie
// const token = req.cookies.jwt_access;


// if (!token) {
//   return next(errorMessage(401, "Unauthorized, No Token"));
// }

// jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
//   if (error) {
//     return next(errorMessage(403, "Invalid Token"));
//   }
//   req.user = user._id;
//   next();
// });