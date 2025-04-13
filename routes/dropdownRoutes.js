import express from "express";
import { getDistrictsByState ,getSubDivisionsByDistrict,getBlocksBySubDivision,getGPsByBlock,getTotalHouseholdsSurveyedDetails,getHealthDetailsWithFilters,getMemberDetails} from '../controllers/dropdownController.js';
const router = express.Router();


router.post('/getDistrictsByState', getDistrictsByState);

router.post('/getSubDivisionsByDistrict', getSubDivisionsByDistrict);
router.post('/getBlocksBySubDivision', getBlocksBySubDivision);
router.post('/getGPsByBlock', getGPsByBlock);
router.post('/getTotalHouseholdsSurveyedDetails', getTotalHouseholdsSurveyedDetails);
router.post('/getHealthDetailsWithFilters', getHealthDetailsWithFilters);
router.post('/getMemberDetails', getMemberDetails);
export default router;