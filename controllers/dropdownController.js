import {getDistrictsByStateModel,getSubDivisionsByDistrictModel,getBlocksBySubDivisionModel, getGPsByBlockModel, getTotalHouseholdsSurveyedDetailsModel,getHealthDetailsWithFiltersModel,getMemberDetailsModel,getAllUserTypesModel,getAllTrainingOptionsModel} from "../models/dropdownModel.js";
import logger from "../utils/logger.js";

export const getDistrictsByState = async (req, res) => {
    try {
      const { state_id } = req.body;
  
      console.log({ state_id });
  
      if (!state_id) {
        logger.debug(
          JSON.stringify({
            API: "getDistrictsByState",
            REQUEST: { state_id },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameter: state_id is required",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter: state_id is required",
          data: null,
        });
      }
  
      const districts = await getDistrictsByStateModel(state_id);
  
      logger.debug(
        JSON.stringify({
          API: "getDistrictsByState",
          REQUEST: { state_id },
          RESPONSE: {
            success: true,
            message: "Districts fetched successfully",
            data: districts,
          },
        })
      );
  
      return res.status(200).json({
        success: true,
        message: "Districts fetched successfully",
        data: districts,
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, please try again",
        data: null,
      });
    }
  };
  

  export const getSubDivisionsByDistrict = async (req, res) => {
    try {
      const { dist_id } = req.body;
  
      console.log({ dist_id });
  
      if (!dist_id) {
        logger.debug(
          JSON.stringify({
            API: "getSubDivisionsByDistrict",
            REQUEST: { dist_id },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameter: dist_id is required",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter: dist_id is required",
          data: null,
        });
      }
  
      const subDivisions = await getSubDivisionsByDistrictModel(dist_id);
  
      if (!subDivisions.length) {
        logger.debug(
          JSON.stringify({
            API: "getSubDivisionsByDistrict",
            REQUEST: { dist_id },
            RESPONSE: {
              success: true,
              message: "No subdivisions found",
              data: [],
            },
          })
        );
      }
  
      return res.status(200).json({
        success: true,
        message: "Subdivisions fetched successfully",
        data: subDivisions,
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, please try again",
        data: null,
      });
    }
  };


  export const getBlocksBySubDivision = async (req, res) => {
    try {
      const { sub_div_id } = req.body;
  
      console.log({ sub_div_id });
  
      if (!sub_div_id) {
        logger.debug(
          JSON.stringify({
            API: "getBlocksBySubDivision",
            REQUEST: { sub_div_id },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameter: sub_div_id is required",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter: sub_div_id is required",
          data: null,
        });
      }
  
      const blocks = await getBlocksBySubDivisionModel(sub_div_id);
  
      if (!blocks.length) {
        logger.debug(
          JSON.stringify({
            API: "getBlocksBySubDivision",
            REQUEST: { sub_div_id },
            RESPONSE: {
              success: true,
              message: "No blocks found",
              data: [],
            },
          })
        );
      }
  
      return res.status(200).json({
        success: true,
        message: "Blocks fetched successfully",
        data: blocks,
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, please try again",
        data: null,
      });
    }
  };
  

  export const getGPsByBlock = async (req, res) => {
    try {
      const { blk_id } = req.body;
  
      console.log({ blk_id });
  
      if (!blk_id) {
        logger.debug(
          JSON.stringify({
            API: "getGPsByBlock",
            REQUEST: { blk_id },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameter: blk_id is required",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter: blk_id is required",
          data: null,
        });
      }
  
      const gps = await getGPsByBlockModel(blk_id);
  
      if (!gps.length) {
        logger.debug(
          JSON.stringify({
            API: "getGPsByBlock",
            REQUEST: { blk_id },
            RESPONSE: {
              success: true,
              message: "No GPs found",
              data: [],
            },
          })
        );
      }
  
      return res.status(200).json({
        success: true,
        message: "GPs fetched successfully",
        data: gps,
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, please try again",
        data: null,
      });
    }
  };
  

  export const getTotalHouseholdsSurveyedDetails = async (req, res) => {
    try {
      const {
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
      } = req.body;
  
      // Optional validation
      if (!start_date ) {
        return res.status(400).json({
          success: false,
          message: "Start date and end date are required",
          data: null,
        });
      }
  
      const result = await getTotalHouseholdsSurveyedDetailsModel(
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date
      );
  
      return res.status(200).json({
        success: true,
        message: "Surveyed household details fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("getTotalHouseholdsSurveyedDetails error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch household survey details",
        data: null,
      });
    }
  };


  export const getHealthDetailsWithFilters = async (req, res) => {
    try {
      const {
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
        nutrition_status,
        bp_status,
        blood_sugar,
        gender,
        household_id,
        age_group,
      } = req.body;
  
      const results = await getHealthDetailsWithFiltersModel(
        state_id || 0,
        district_id || 0,
        subdivision_id || 0,
        block_id || 0,
        village_id || 0,
        start_date || "",
        end_date || "",
        nutrition_status || "ALL",
        bp_status || "ALL",
        blood_sugar || "ALL",
        gender || "ALL",
        household_id || 0,
        age_group || "ALL"
      );
  
      return res.status(200).json({
        success: true,
        message: "Health details fetched successfully",
        data: results,
      });
    } catch (error) {
      console.error("getHealthDetailsWithFilters error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch health details",
        data: null,
      });
    }
  };


  export const getMemberDetails = async (req, res) => {
    try {
      const {
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
      } = req.body;
  
      // Validate required fields
      if (!(state_id)) {
        return res.status(400).json({
          success: false,
          message: "Missing required input parameters",
          data: null,
        });
      }
  
      const data = await getMemberDetailsModel(
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date
      );
  
      if (data && data.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Member details fetched successfully",
          data,
        });
      } else {
        return res.status(404).json({
          success: true,
          message: "No member details found for given filters",
          data: [],
        });
      }
    } catch (error) {
      console.error("getMemberDetails error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
  
  export const getAllUserTypes = async (req, res) => {
    try {
      const data = await getAllUserTypesModel();
  
      if (data && data.length > 0) {
        return res.status(200).json({
          success: true,
          message: "User types fetched successfully",
          data,
        });
      } else {
        return res.status(404).json({
          success: true,
          message: "No user types found",
          data: [],
        });
      }
    } catch (error) {
      console.error("getAllUserTypes error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  };


  export const getAllTrainingOptions = async (req, res) => {
    try {
      const data = await getAllTrainingOptionsModel();
  
      if (data && data.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Training options fetched successfully",
          data,
        });
      } else {
        return res.status(404).json({
          success: true,
          message: "No training options found",
          data: [],
        });
      }
    } catch (error) {
      console.error("getAllTrainingOptions error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
  




  

 
  
  