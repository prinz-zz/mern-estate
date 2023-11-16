import express from "express";
const router = express.Router();

import { updateUser, deleteUser } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
