import express from "express";
import { getDistrictsByState ,getSubDivisionsByDistrict,getBlocksBySubDivision,getGPsByBlock,getTotalHouseholdsSurveyedDetails,
    getHealthDetailsWithFilters,getMemberDetails,getAllUserTypes,getAllTrainingOptions,getSurveyorDashboardCount,
    getHouseholdSurveyCountAnalytics,getHealthDetailsCountAnalytics,getSchemeEnrollmentCountAnalytics,
    getLowBirthWeigthCountAnalytics,getWelfareProgramCountAnalytics,gethouseHoldCountAnalytics} from '../controllers/dropdownController.js';
const router = express.Router();


router.post('/getDistrictsByState', getDistrictsByState);

router.post('/getSubDivisionsByDistrict', getSubDivisionsByDistrict);
router.post('/getBlocksBySubDivision', getBlocksBySubDivision);
router.post('/getGPsByBlock', getGPsByBlock);
router.post('/getTotalHouseholdsSurveyedDetails', getTotalHouseholdsSurveyedDetails);
router.post('/getHealthDetailsWithFilters', getHealthDetailsWithFilters);
router.post('/getMemberDetails', getMemberDetails);
router.post('/getAllUserTypes', getAllUserTypes);
router.post('/getAllTrainingOptions', getAllTrainingOptions);
router.post('/getSurveyorDashboardCount', getSurveyorDashboardCount);
router.post('/getHouseholdSurveyCountAnalytics', getHouseholdSurveyCountAnalytics);
router.post('/getHealthDetailsCountAnalytics', getHealthDetailsCountAnalytics);
router.post('/getSchemeEnrollmentCountAnalytics', getSchemeEnrollmentCountAnalytics);
router.post('/getLowBirthWeigthCountAnalytics', getLowBirthWeigthCountAnalytics);
router.post('/getWelfareProgramCountAnalytics', getWelfareProgramCountAnalytics);
router.post('/gethouseHoldCountAnalytics', gethouseHoldCountAnalytics);

export default router;