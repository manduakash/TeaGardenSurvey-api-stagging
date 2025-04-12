
import { insertHouseholdModel , insertHealthModel, insertLivelihoodModel, insertWelfareModel} from "../models/surveyModel.js";
import logger from "../utils/logger.js";

export const insertHousehold = async (req, res) => {
    try {
      const {
        state,
        district,
        sub_division,
        block,
        gp,
        village,
        house_number,
        latitude,
        longitude,
        family_income,
        total_members,
      } = req.body;
  
      console.log({
        state,
        district,
        sub_division,
        block,
        gp,
        village,
        house_number,
        latitude,
        longitude,
        family_income,
        total_members,
      });
  
      // Validate required fields
      if (!(state && district && block && gp && village && house_number && latitude && longitude)) {
        logger.debug(
          JSON.stringify({
            API: "insertHousehold",
            REQUEST: {
              state,
              district,
              sub_division,
              block,
              gp,
              village,
              house_number,
              latitude,
              longitude,
              family_income,
              total_members,
            },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameters",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter(s)",
          data: null,
        });
      }
  
      // Call model
      const result = await insertHouseholdModel(
        state,
        district,
        sub_division,
        block,
        gp,
        village,
        house_number,
        latitude,
        longitude,
        family_income,
        total_members
      );
  
      console.log("result", result);
  
      if (result === 0) {
        logger.debug(
          JSON.stringify({
            API: "insertHousehold",
            REQUEST: {
              state,
              district,
              sub_division,
              block,
              gp,
              village,
              house_number,
              latitude,
              longitude,
              family_income,
              total_members,
            },
            RESPONSE: {
              success: true,
              message: "Household inserted successfully",
            },
          })
        );
  
        return res.status(200).json({
          success: true,
          message: "Household inserted successfully",
        });
      } else {
        logger.debug(
          JSON.stringify({
            API: "insertHousehold",
            REQUEST: {
              state,
              district,
              sub_division,
              block,
              gp,
              village,
              house_number,
              latitude,
              longitude,
              family_income,
              total_members,
            },
            RESPONSE: {
              success: false,
              message: "Failed to insert household",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Failed to insert household",
        });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, Please try again",
        data: null,
      });
    }
  };
  

  export const insertHealth = async (req, res) => {
    try {
      const {
        household_id,
        name,
        gender,
        dob,
        age,
        height,
        weight,
        bmi,
        nutrition_status,
        bp,
        sugar_level,
        remarks,
      } = req.body;
  
      console.log({
        household_id,
        name,
        gender,
        dob,
        age,
        height,
        weight,
        bmi,
        nutrition_status,
        bp,
        sugar_level,
        remarks,
      });
  
      // Validate required fields
      if (!(household_id && name && gender && dob && age)) {
        logger.debug(
          JSON.stringify({
            API: "insertHealth",
            REQUEST: {
              household_id,
              name,
              gender,
              dob,
              age,
              height,
              weight,
              bmi,
              nutrition_status,
              bp,
              sugar_level,
              remarks,
            },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameters",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter(s)",
          data: null,
        });
      }
  
      // Call model function
      const result = await insertHealthModel(
        household_id,
        name,
        gender,
        dob,
        age,
        height,
        weight,
        bmi,
        nutrition_status,
        bp,
        sugar_level,
        remarks
      );
  
      console.log("result", result);
  
      if (result === 0) {
        logger.debug(
          JSON.stringify({
            API: "insertHealth",
            REQUEST: {
              household_id,
              name,
              gender,
              dob,
              age,
              height,
              weight,
              bmi,
              nutrition_status,
              bp,
              sugar_level,
              remarks,
            },
            RESPONSE: {
              success: true,
              message: "Health record inserted successfully",
            },
          })
        );
  
        return res.status(200).json({
          success: true,
          message: "Health record inserted successfully",
        });
      } else {
        logger.debug(
          JSON.stringify({
            API: "insertHealth",
            REQUEST: {
              household_id,
              name,
              gender,
              dob,
              age,
              height,
              weight,
              bmi,
              nutrition_status,
              bp,
              sugar_level,
              remarks,
            },
            RESPONSE: {
              success: false,
              message: "Failed to insert health record",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Failed to insert health record",
        });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, Please try again",
        data: null,
      });
    }
  };
  


  export const insertLivelihood = async (req, res) => {
    try {
      const {
        household_id,
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option,
      } = req.body;
  
      console.log({
        household_id,
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option,
      });
  
      // Validate required fields
      if (
        household_id === undefined ||
        shg_member === undefined ||
        wants_to_join_shg === undefined ||
        training_required === undefined
      ) {
        logger.debug(
          JSON.stringify({
            API: "insertLivelihood",
            REQUEST: {
              household_id,
              shg_member,
              wants_to_join_shg,
              training_required,
              training_option,
            },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameters",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter(s)",
          data: null,
        });
      }
  
      // Call model
      const result = await insertLivelihoodModel(
        household_id,
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option
      );
  
      console.log("result", result);
  
      if (result === 0) {
        logger.debug(
          JSON.stringify({
            API: "insertLivelihood",
            REQUEST: {
              household_id,
              shg_member,
              wants_to_join_shg,
              training_required,
              training_option,
            },
            RESPONSE: {
              success: true,
              message: "Livelihood data inserted successfully",
            },
          })
        );
  
        return res.status(200).json({
          success: true,
          message: "Livelihood data inserted successfully",
        });
      } else {
        logger.debug(
          JSON.stringify({
            API: "insertLivelihood",
            REQUEST: {
              household_id,
              shg_member,
              wants_to_join_shg,
              training_required,
              training_option,
            },
            RESPONSE: {
              success: false,
              message: "Failed to insert livelihood data",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Failed to insert livelihood data",
        });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, Please try again",
        data: null,
      });
    }
  };
  
  


  export const insertWelfare = async (req, res) => {
    try {
      const {
        household_id,
        caste_certificate,
        lakshmir_bhandar,
        swasthya_sathi,
        old_age_pension,
      } = req.body;
  
      console.log({
        household_id,
        caste_certificate,
        lakshmir_bhandar,
        swasthya_sathi,
        old_age_pension,
      });
  
      // Validate required fields
      if (
        household_id === undefined ||
        caste_certificate === undefined ||
        lakshmir_bhandar === undefined ||
        swasthya_sathi === undefined ||
        old_age_pension === undefined
      ) {
        logger.debug(
          JSON.stringify({
            API: "insertWelfare",
            REQUEST: {
              household_id,
              caste_certificate,
              lakshmir_bhandar,
              swasthya_sathi,
              old_age_pension,
            },
            RESPONSE: {
              success: false,
              message: "Invalid Input Parameters",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Invalid Input Parameter(s)",
          data: null,
        });
      }
  
      // Call model
      const result = await insertWelfareModel(
        household_id,
        caste_certificate,
        lakshmir_bhandar,
        swasthya_sathi,
        old_age_pension
      );
  
      console.log("result", result);
  
      if (result === 0) {
        logger.debug(
          JSON.stringify({
            API: "insertWelfare",
            REQUEST: {
              household_id,
              caste_certificate,
              lakshmir_bhandar,
              swasthya_sathi,
              old_age_pension,
            },
            RESPONSE: {
              success: true,
              message: "Welfare data inserted successfully",
            },
          })
        );
  
        return res.status(200).json({
          success: true,
          message: "Welfare data inserted successfully",
        });
      } else {
        logger.debug(
          JSON.stringify({
            API: "insertWelfare",
            REQUEST: {
              household_id,
              caste_certificate,
              lakshmir_bhandar,
              swasthya_sathi,
              old_age_pension,
            },
            RESPONSE: {
              success: false,
              message: "Failed to insert welfare data",
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: "Failed to insert welfare data",
        });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred, Please try again",
        data: null,
      });
    }
  };
  
  



