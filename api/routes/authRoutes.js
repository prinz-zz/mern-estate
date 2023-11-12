import express from "express";
const router = express.Router();

import { signUp } from "../controller/authController.js";

router.post("/signUp", signUp);


export default router;