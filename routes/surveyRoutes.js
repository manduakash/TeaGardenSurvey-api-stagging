import express from "express";
import {
  insertHousehold,
  insertHealth,
  insertLivelihood,
  insertWelfare,
  insertConsolidatedFamilyData,
  offlineSyncSurveyData,
  offlineSyncSurveyAllData,
  insertHouseHoldAndFamilyMembersData,
} from "../controllers/surveyController.js";
const router = express.Router();

router.post("/insertHousehold", insertHousehold);
router.post("/insertHealth", insertHealth);
router.post("/insertLivelihood", insertLivelihood);
router.post("/insertWelfare", insertWelfare);
router.post("/insertConsolidatedFamilyData", insertConsolidatedFamilyData);
router.post("/offlineSyncSurveyData", offlineSyncSurveyData);
router.post("/offlineSyncSurveyAllData", offlineSyncSurveyAllData);
router.post("/insertHouseHoldAndFamilyMembersData", insertHouseHoldAndFamilyMembersData);
export default router;
