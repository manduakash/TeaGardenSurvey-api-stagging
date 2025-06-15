import express from "express";
import {
  insertHousehold,
  insertHealth,
  insertLivelihood,
  insertWelfare,
  insertHouseHoldAndFamilyMembersData,
  insertTrainingOption,
  getHouseholdBySurveyOrContact,
  insertMigrantOccupation,
  getAllMigrantOccupations,
  insertDisabilityType,
  getAllDisabilityTypes,
} from "../controllers/surveyController.js";
const router = express.Router();

router.post("/insertHousehold", insertHousehold);
router.post("/insertHealth", insertHealth);
router.post("/insertLivelihood", insertLivelihood);
router.post("/insertWelfare", insertWelfare);
router.post("/insertHouseHoldAndFamilyMembersData", insertHouseHoldAndFamilyMembersData);
router.post("/insertTrainingOption", insertTrainingOption);
router.post("/getHouseholdBySurveyOrContact", getHouseholdBySurveyOrContact);
router.post("/insertMigrantOccupation", insertMigrantOccupation);
router.post("/getAllMigrantOccupations", getAllMigrantOccupations);
router.post("/insertDisabilityType", insertDisabilityType);
router.post("/getAllDisabilityTypes", getAllDisabilityTypes);
export default router;
