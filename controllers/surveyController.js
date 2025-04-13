
import { insertHouseholdModel , insertHealthModel, insertLivelihoodModel, insertWelfareModel} from "../models/surveyModel.js";
import logger from "../utils/logger.js";

export const insertHousehold = async (req, res) => {
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
    user_id,
  } = req.body;
console.log({ state,
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
  user_id,})
  // Basic validation
  if (
    !user_id == undefined 
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required input fields",
    });
  }

  try {
    const errorCode = await insertHouseholdModel(
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
      user_id
    );

    let response = {
      0: { status: 200, message: "Household inserted successfully" },
      1: { status: 400, message: "Invalid user ID." },
      2: { status: 400, message: "Invalid state ID." },
      3: { status: 400, message: "Invalid district ID." },
      4: { status: 400, message: "Invalid sub-division ID." },
      5: { status: 400, message: "Invalid block ID." },
      6: { status: 400, message: "Invalid GP ID." },
      7: { status: 400, message: "Invalid village ID." },
      8: { status: 400, message: "Duplicate survey ID." },
      9: { status: 500, message: "Internal server error." },
    };

    const resData = response[errorCode] || {
      status: 500,
      message: "Unknown error occurred.",
    };

    return res.status(resData.status).json({
      success: resData.status === 200,
      message: resData.message,
    });

  } catch (error) {
    console.error("insertHousehold error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred.",
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
        household_id === undefined 
      
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
        let err_msg = "Failed to insert livelihood data";
        if (result === 1) {
          err_msg = "Household not found."
        }else
        if (result === 2) {
          err_msg = "Livelihood record already exists for this household."
        }else 
        if (result === 3) {
          err_msg = "Invalid Training Option."
        }else
        if (result === 9) {
          err_msg = "Internal server error."
        }
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
              message: err_msg,
            },
          })
        );
  
        return res.status(400).json({
          success: false,
          message: err_msg,
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
        household_id === undefined 
       
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
  
  



