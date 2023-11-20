import express from "express";
const router = express.Router();

import { updateUser, deleteUser, getUserListings, getUser } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);


export default router;
