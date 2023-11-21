import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorMessage } from "../utils/error.js";
import { genTokenAndSetCookie } from "../utils/genTokenAndSetCookie.js";

////////////////////////////////SignUp
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorMessage(401, "All fields are required"));
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

/////////////////////////////SignIn
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //if user exists
    const user = await User.findOne({ email });
    const comparePassword = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user) {
      return next(errorMessage(404, "User not found"));
    }
    if (!comparePassword) {
      return next(errorMessage(400, "Wrong credentials"));
    }

    if (user) {
      genTokenAndSetCookie(res, user._id);
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
    }
  } catch (error) {
    next(error);
  }
};

///////////////signOut
export const signOut = async (req, res, next) => {
  try {
    res.cookie("jwt_access", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////Google
// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({email: req.body.email});

//     if(user){
//       genTokenAndSetCookie(res, user._id);
//       res.status(200).json({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       });
//     }else {
//       const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(generatePassword, 10)
//     }

//   } catch (error) {
//     next(error);
//   }
// }
