import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json("All fields are required");
  }

  //   //if user exists
  //   const userExists = await User.findOne({ username });
  //   if (userExists) {
  //     res.status(400).json("User already exists");
  //   }

  //Hash password
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
