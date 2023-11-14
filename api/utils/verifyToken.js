import jwt from "jsonwebtoken";
import { errorMessage } from "./error.js";

export const verifyToken = (req, res, next) => {
  //access cookie
  const token = req.cookies.jwt;

  if (!token) {
    return next(errorMessage(401, "Unauthorized, No Token"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorMessage(403, "Invalid Token"));
    }
    req.user = user;
    next();
  });
};
