import express from "express";
import { getDashboardCounts } from '../controllers/commonController.js';
const router = express.Router();


router.post('/dashboardCount', getDashboardCounts);

export default router;