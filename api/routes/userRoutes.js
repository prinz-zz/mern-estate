import express from "express";
const router = express.Router();

import { updateUser } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

router.put("/update/:id", verifyToken, updateUser);

export default router;
