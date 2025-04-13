import {getDistrictsByStateModel,getSubDivisionsByDistrictModel,getBlocksBySubDivisionModel, getGPsByBlockModel} from "../models/dropdownModel.js";
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
  
  