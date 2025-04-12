import express from "express";
import { insertHousehold , insertHealth, insertLivelihood, insertWelfare} from '../controllers/surveyController.js';
const router = express.Router();


router.post('/insertHousehold', insertHousehold);



router.post('/insertHealth', insertHealth);
router.post('/insertLivelihood', insertLivelihood);
router.post('/insertWelfare', insertWelfare);
export default router;