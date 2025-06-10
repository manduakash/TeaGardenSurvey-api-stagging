import express from "express";
import { createUser, getAllUsers } from '../controllers/userController.js';
const router = express.Router();


router.post('/createUser', createUser);
router.post('/getAllUsers', getAllUsers);

export default router;