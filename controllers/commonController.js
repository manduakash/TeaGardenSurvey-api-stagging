import {getDashboardCountsModel} from "../models/commonModel.js"
import logger from "../utils/logger.js";
export const getDashboardCounts = async (req, res) => {
    try {
      const {
        dist,
        sub_div,
        blk,
        gp,
        tg
      } = req.body; // Extract input from query parameters
  
      // Convert parameters to integers or set to 0 if not provided
      const distId = dist ? parseInt(dist) : 0;
      const subDivId = sub_div ? parseInt(sub_div) : 0;
      const blkId = blk ? parseInt(blk) : 0;
      const gpId = gp ? parseInt(gp) : 0;
      const teagardenId = tg ? parseInt(tg) : 0;
  
      // Debug logging for request
      logger.debug(
        JSON.stringify({
          API: "getDashboardCounts",
          REQUEST: {
            sub_div: subDivId,
            blk: blkId,
            gp: gpId,
            village: teagardenId
          }
        })
      );
  
      // Call model function to get dashboard counts
      const result = await getDashboardCountsModel(
        distId,
        subDivId,
        blkId,
        gpId,
        teagardenId
      );
      console.log("result", result);
  
      if (result) {
        // If data was retrieved successfully
        logger.debug(
          JSON.stringify({
            API: "getDashboardCounts",
            REQUEST: {
              sub_div: subDivId,
              blk: blkId,
              gp: gpId,
              village: teagardenId
            },
            RESPONSE: {
              success: true,
              message: "Dashboard counts retrieved successfully",
              data: result
            }
          })
        );
  
        return res.status(200).json({
          success: true,
          message: "Dashboard counts retrieved successfully",
          data: result
        });
      } else {
        // If data retrieval failed
        logger.debug(
          JSON.stringify({
            API: "getDashboardCounts",
            REQUEST: {
              sub_div: subDivId,
              blk: blkId,
              gp: gpId,
              village: teagardenId
            },
            RESPONSE: {
              success: false,
              message: "Failed to retrieve dashboard counts",
              data: null
            }
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Failed to retrieve dashboard counts",
          data: null
        });
      }
    } catch (error) {
      // Log server error
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, Please try again",
        data: null
      });
    }
  };