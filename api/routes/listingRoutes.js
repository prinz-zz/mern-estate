import express from 'express';
const router = express.Router();
import { createListing, deleteListing } from '../controller/listingController.js'; 
import { verifyToken } from '../utils/verifyToken.js';

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListing);

export default router;