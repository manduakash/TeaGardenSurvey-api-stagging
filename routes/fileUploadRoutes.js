import express from "express";
import { uploadBase64Image } from "../controllers/imageUploadController.js";
const router = express.Router();


router.post('/uploadBase64Image', uploadBase64Image);
export default router;