import {
  insertHealthModel,
  insertLivelihoodModel,
  insertWelfareModel,
  insertHouseholdModelV1,
  insertTrainingOptionModel,
  getHouseholdBySurveyOrContactModel,
  insertMigrantOccupationModel,
  getAllMigrantOccupationsModel,
  getAllDisabilityTypesModel,
  insertDisabilityTypeModel,
} from "../models/surveyModel.js";
import logger from "../utils/logger.js";
import { base64ToFileServer } from "./imageUploadController.js";

export const insertHousehold = async (req, res) => {
  const {
    state,
    district,
    sub_division,
    block,
    gp,
    teagarden,
    house_number,
    latitude,
    longitude,
    family_income,
    total_members,
    user_id,
    family_head_name,
    family_head_contact_number,
    family_head_img = null,
    household_img = null,
    family_head_signature_img = null,
    caste,
    caste_certificate_number,
  } = req.body;

  if (
    !user_id ||
    !state ||
    !house_number
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required household fields.",
    });
  }

  try {
    const family_head_img_response = await base64ToFileServer(
      family_head_img,
      `family_head_img_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!family_head_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `family_head_img: ${family_head_img_response?.message || "Failed to upload"}`,
      });
    }

    const household_img_response = await base64ToFileServer(
      household_img,
      `household_img_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!household_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `household_img: ${household_img_response?.message || "Failed to upload"}`,
      });
    }

    const family_head_signature_img_response = await base64ToFileServer(
      family_head_signature_img,
      `family_head_signature_img_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!family_head_signature_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `family_head_signature_img: ${family_head_signature_img_response?.message || "Failed to upload"}`,
      });
    }

    const { error_code, household_id } = await insertHouseholdModelV1(
      state,
      district,
      sub_division,
      block,
      gp,
      teagarden,
      house_number,
      latitude,
      longitude,
      family_income,
      total_members,
      user_id,
      family_head_name,
      family_head_contact_number,
      family_head_img_response?.url
        ? `${req.protocol}://${req.get("host")}${family_head_img_response.url}`
        : "",
      household_img_response?.url
        ? `${req.protocol}://${req.get("host")}${household_img_response.url}`
        : "",
      family_head_signature_img_response?.url
        ? `${req.protocol}://${req.get("host")}${family_head_signature_img_response.url}`
        : "",
      caste,
      caste_certificate_number
    );

    const responseMap = {
      0: "Household inserted successfully",
      1: "Invalid user ID.",
      2: "Invalid state ID.",
      3: "Invalid district ID.",
      4: "Invalid sub-division ID.",
      5: "Invalid block ID.",
      6: "Invalid GP ID.",
      7: "Invalid teagarden ID.",
      8: "Duplicate survey ID.",
      9: "Internal server error.",
      10: "Household is already exist with this family head contact.",
    };

    if (error_code !== 0 || !household_id) {
      return res.status(error_code === 9 ? 500 : 400).json({
        success: false,
        message: responseMap[error_code] || "Unknown error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Household inserted successfully",
      household_id,
    });
  } catch (error) {
    console.error("insertHouseholdOnly error:", error.message);
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
      is_migrant_laborer,  // new field
      migration_state ,     // new field (state_id)
      is_disabled,
      nature_of_disability,
    } = req.body;
    
    // Validate required fields
    if (household_id === undefined) {
      logger.debug(
        JSON.stringify({
          API: "insertLivelihood",
          REQUEST: {
            household_id,
            shg_member,
            wants_to_join_shg,
            training_required,
            training_option,
            is_migrant_laborer,
            migration_state,
            is_disabled,
            nature_of_disability,
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

    // Call model with new parameters
    const result = await insertLivelihoodModel(
      household_id,
      shg_member,
      wants_to_join_shg,
      training_required,
      training_option,
      is_migrant_laborer,
      migration_state,
      is_disabled,
      nature_of_disability
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
            is_migrant_laborer,
            migration_state,
            is_disabled,
            nature_of_disability,
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
        err_msg = "Household not found.";
      } else if (result === 2) {
        err_msg = "Livelihood record already exists for this household.";
      } else if (result === 3) {
        err_msg = "Invalid Training Option.";
      } else if (result === 9) {
        err_msg = "Internal server error.";
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
            is_migrant_laborer,
            migration_state,
            is_disabled,
            nature_of_disability,
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
      caste_certificate_id_no,
      lakshmir_bhandar,
      lakshmir_bhandar_card_no,
      swasthya_sathi,
      swasthya_sathi_card_no,
      old_age_pension,
      old_age_pension_id_no,
      labour_id,
      labour_card_no,
    } = req.body;

    // Validate required fields
    if (household_id === undefined) {
      logger.debug(
        JSON.stringify({
          API: "insertWelfare",
          REQUEST: {
            household_id,
            caste_certificate,
            caste_certificate_id_no,
            lakshmir_bhandar,
            lakshmir_bhandar_card_no,
            swasthya_sathi,
            swasthya_sathi_card_no,
            old_age_pension,
            old_age_pension_id_no,
            labour_id,
            labour_card_no,
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
      caste_certificate_id_no,
      lakshmir_bhandar,
      lakshmir_bhandar_card_no,
      swasthya_sathi,
      swasthya_sathi_card_no,
      old_age_pension,
      old_age_pension_id_no,
      labour_id,
      labour_card_no
    );

    console.log("result", result);

    if (result === 0) {
      logger.debug(
        JSON.stringify({
          API: "insertWelfare",
          REQUEST: {
            household_id,
            caste_certificate,
            caste_certificate_id_no,
            lakshmir_bhandar,
            lakshmir_bhandar_card_no,
            swasthya_sathi,
            swasthya_sathi_card_no,
            old_age_pension,
            old_age_pension_id_no,
            labour_id,
            labour_card_no,
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
            caste_certificate_id_no,
            lakshmir_bhandar,
            lakshmir_bhandar_card_no,
            swasthya_sathi,
            swasthya_sathi_card_no,
            old_age_pension,
            old_age_pension_id_no,
            labour_id,
            labour_card_no,
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

export const insertHouseHoldAndFamilyMembersData = async (req, res) => {
  const {
    state,
    district,
    sub_division,
    block,
    gp,
    teagarden,
    house_number,
    latitude,
    longitude,
    family_income,
    total_members,
    user_id,
    family_members,
    family_head_name,
    family_head_contact_number,
    family_head_img = null,
    household_img = null,
    family_head_signature_img = null,
    caste,
    caste_certificate_number,
  } = req.body;

  if (!user_id || !Array.isArray(family_members) || family_members.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required input fields or family member data.",
    });
  }

  try {
    // Upload images
    const family_head_img_response = await base64ToFileServer(
      family_head_img,
      "family_head_img" +
        `_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!family_head_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `family_head_img: ${
          family_head_img_response?.message || "Failed to upload"
        }`,
      });
    }

    const household_img_response = await base64ToFileServer(
      household_img,
      "household_img" +
        `_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!household_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `household_img: ${
          household_img_response?.message || "Failed to upload"
        }`,
      });
    }

    const family_head_signature_img_response = await base64ToFileServer(
      family_head_signature_img,
      "family_head_signature_img" +
        `_${district}_${sub_division}_${block}_${gp}_${teagarden}_${house_number.replace("/", "-")}`
    );
    if (!family_head_signature_img_response?.success) {
      return res.status(400).json({
        success: false,
        message: `family_head_signature_img: ${
          family_head_signature_img_response?.message || "Failed to upload"
        }`,
      });
    }

    // Insert household first
    const { error_code, household_id } = await insertHouseholdModelV1(
      state,
      district,
      sub_division,
      block,
      gp,
      teagarden,
      house_number,
      latitude,
      longitude,
      family_income,
      total_members,
      user_id,
      family_head_name,
      family_head_contact_number,
      family_head_img_response?.url
        ? `${req.protocol}://${req.get("host")}${family_head_img_response.url}`
        : "",
      household_img_response?.url
        ? `${req.protocol}://${req.get("host")}${household_img_response.url}`
        : "",
      family_head_signature_img_response?.url
        ? `${req.protocol}://${req.get("host")}${family_head_signature_img_response.url}`
        : "",
      caste,
      caste_certificate_number
    );

    const responseMap = {
      0: "Household inserted successfully",
      1: "Invalid user ID.",
      2: "Invalid state ID.",
      3: "Invalid district ID.",
      4: "Invalid sub-division ID.",
      5: "Invalid block ID.",
      6: "Invalid GP ID.",
      7: "Invalid teagarden ID.",
      8: "Duplicate survey ID.",
      9: "Internal server error.",
      10: "Household is already exist with this family head contact.",
    };

    if (error_code !== 0 || !household_id) {
      return res.status(error_code === 9 ? 500 : 400).json({
        success: false,
        message: responseMap[error_code] || "Unknown error",
      });
    }

    // Insert family members
    const resultMessages = [];

    for (const member of family_members) {
      const {
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
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option,
        caste_certificate,
        lakshmir_bhandar,
        swasthya_sathi,
        old_age_pension,
        caste_certificate_id_no,
        lakshmir_bhandar_card_no,
        swasthya_sathi_card_no,
        old_age_pension_id_no,
        is_migrant_laborer,
        migration_state,
        labour_id,
        labour_card_no,
        is_disabled,
        nature_of_disability,
      } = member;

      const memberResult = {
        name,
        health: "success",
        livelihood: "success",
        welfare: "success",
      };

      try {
        if (!(name && gender && dob && age)) {
          memberResult.health = "skipped (missing required fields)";
        } else {
          const healthResult = await insertHealthModel(
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
            labour_id,
            labour_card_no,
            is_disabled,
            nature_of_disability
          );

          if (healthResult !== 0) {
            memberResult.health = "failed";
          }
        }
      } catch {
        memberResult.health = "failed";
      }

      try {
        // Pass the new parameters to insertLivelihoodModel
        const livelihoodResult = await insertLivelihoodModel(
          household_id,
          shg_member,
          wants_to_join_shg,
          training_required,
          training_option,
          is_migrant_laborer,
          migration_state,
          is_disabled,
          nature_of_disability
        );

        if (livelihoodResult !== 0) {
          memberResult.livelihood = "failed";
        }
      } catch {
        memberResult.livelihood = "failed";
      }

      try {
        const welfareResult = await insertWelfareModel(
          household_id,
          caste_certificate,
          lakshmir_bhandar,
          swasthya_sathi,
          old_age_pension,
          caste_certificate_id_no,
          lakshmir_bhandar_card_no,
          swasthya_sathi_card_no,
          old_age_pension_id_no,
          labour_id,
          labour_card_no
        );

        if (welfareResult !== 0) {
          memberResult.welfare = "failed";
        }
      } catch {
        memberResult.welfare = "failed";
      }

      resultMessages.push(memberResult);
    }

    const failedMembers = resultMessages.filter(
      (m) =>
        m.health === "failed" ||
        m.livelihood === "failed" ||
        m.welfare === "failed"
    );

    if (failedMembers.length > 0) {
      return res.status(207).json({
        success: false,
        message: "Some records failed to save",
        household_id,
        data: resultMessages,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Household and all family data inserted successfully",
      household_id,
      data: resultMessages,
    });
  } catch (error) {
    console.error("insertHouseholdAndFamilyData error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred.",
    });
  }
};


export const insertTrainingOption = async (req, res) => {
  try {
    const { training_name } = req.body;

    // Input validation
    if (!training_name) {
      return res.status(400).json({
        success: false,
        message: "Training name is required",
        data: null,
      });
    }

    const statusCode = await insertTrainingOptionModel(training_name);

    let message = "Unknown error occurred";
    let success = false;
    let status = 400;

    switch (statusCode) {
      case 0:
        message = "Training option inserted successfully";
        success = true;
        status = 200;
        break;
      case 1:
        message = "Duplicate training name";
        break;
      case 2:
        message = "Invalid training name format";
        break;
      case 9:
        message = "Internal server error";
        status = 500;
        break;
    }

    return res.status(status).json({
      success,
      message,
      data: null,
    });

  } catch (error) {
    console.error("insertTrainingOption error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const getHouseholdBySurveyOrContact = async (req, res) => {
  try {
    const { survey_id_or_contact } = req.body;

    if (!survey_id_or_contact) {
      return res.status(400).json({
        success: false,
        message: "Missing required input parameter: survey_id_or_contact",
        data: null,
      });
    }

    const data = await getHouseholdBySurveyOrContactModel(survey_id_or_contact);

    if (data && data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Household details fetched successfully",
        data,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "No household found for the given input",
        data: [],
      });
    }
  } catch (error) {
    console.error("getHouseholdBySurveyOrContact error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const insertMigrantOccupation = async (req, res) => {
  try {
    const { occupation_name } = req.body;

    if (!occupation_name) {
      return res.status(400).json({
        success: false,
        message: "Occupation name is required",
      });
    }

    const result = await insertMigrantOccupationModel(occupation_name);

    if (result.error_code === 0) {
      return res.status(201).json({
        success: true,
        message: "Occupation inserted successfully",
        inserted_id: result.inserted_id,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to insert occupation",
      });
    }
  } catch (error) {
    console.error("insertMigrantOccupation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllMigrantOccupations = async (req, res) => {
  try {
    const data = await getAllMigrantOccupationsModel();

    if (data && data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Migrant occupations fetched successfully",
        data,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "No migrant occupations found",
        data: [],
      });
    }
  } catch (error) {
    console.error("getAllMigrantOccupations error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const insertDisabilityType = async (req, res) => {
  const { disability_name } = req.body;

  if (!disability_name) {
    return res.status(400).json({ success: false, message: "Disability name is required" });
  }

  const result = await insertDisabilityTypeModel(disability_name);

  if (result.error_code === 0) {
    return res.status(201).json({
      success: true,
      message: "Disability type inserted successfully",
      inserted_id: result.inserted_id,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Failed to insert disability type",
  });
};

export const getAllDisabilityTypes = async (req, res) => {
  const data = await getAllDisabilityTypesModel();

  if (data.length > 0) {
    return res.status(200).json({
      success: true,
      message: "Disability types fetched successfully",
      data,
    });
  }

  return res.status(404).json({
    success: true,
    message: "No disability types found",
    data: [],
  });
};