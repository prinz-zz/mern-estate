import express from "express";
const router = express.Router();

import { signUp, signIn, signOut } from "../controller/authController.js";

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);


export default router;