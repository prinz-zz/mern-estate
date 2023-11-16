import express from 'express';
const router = express.Router();
import { createListing } from '../controller/listingController.js'; 
import { verifyToken } from '../utils/verifyToken.js';

router.post('/create',verifyToken, createListing);

export default router;