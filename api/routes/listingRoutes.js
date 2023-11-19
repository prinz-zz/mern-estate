import express from 'express';
const router = express.Router();
import { createListing, deleteListing, updateListing, getListing } from '../controller/listingController.js'; 
import { verifyToken } from '../utils/verifyToken.js';

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListing);
router.patch('/update/:id',verifyToken, updateListing);
router.get('/getListing/:id', getListing);

export default router;