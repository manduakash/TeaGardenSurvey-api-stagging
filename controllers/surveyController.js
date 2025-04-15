import {
  insertHouseholdModel,
  insertHealthModel,
  insertLivelihoodModel,
  insertWelfareModel,
  insertHouseholdModelV1,
  insertTrainingOptionModel,
} from "../models/surveyModel.js";
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
    family_head_name,
    family_head_contact_number,
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
    user_id,
    family_head_name,
    family_head_contact_number,
  });
  // Basic validation
  if (!user_id == undefined) {
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
      user_id,
      family_head_name,
    family_head_contact_number,
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
    if (household_id === undefined) {
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

export const insertConsolidatedFamilyData = async (req, res) => {
  const { household_id, family_members } = req.body;

  if (!household_id || !Array.isArray(family_members) || family_members.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid Input Parameter(s)",
      data: null,
    });
  }

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
          remarks
        );

        if (healthResult !== 0) {
          memberResult.health = "failed";
        }
      }
    } catch (e) {
      memberResult.health = "failed";
    }

    try {
      const livelihoodResult = await insertLivelihoodModel(
        household_id,
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option
      );

      if (livelihoodResult !== 0) {
        memberResult.livelihood = "failed";
      }
    } catch (e) {
      memberResult.livelihood = "failed";
    }

    try {
      const welfareResult = await insertWelfareModel(
        household_id,
        caste_certificate,
        lakshmir_bhandar,
        swasthya_sathi,
        old_age_pension
      );

      if (welfareResult !== 0) {
        memberResult.welfare = "failed";
      }
    } catch (e) {
      memberResult.welfare = "failed";
    }

    resultMessages.push(memberResult);
  }

  const failedMembers = resultMessages.filter(
    (m) => m.health === "failed" || m.livelihood === "failed" || m.welfare === "failed"
  );

  if (failedMembers.length > 0) {
    return res.status(207).json({
      success: false,
      message: "Some records failed to save",
      data: resultMessages,
    });
  }

  return res.status(200).json({
    success: true,
    message: "All family data inserted successfully",
    data: resultMessages,
  });
};

export const insertHouseholdV1 = async (req, res) => {
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
    family_head_img = null,
    household_img = null,
    family_head_signature_img = null
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
    user_id,
    family_head_img,
    household_img,
    family_head_signature_img
  });

  // Basic validation
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Missing required input fields",
    });
  }

  try {
    const { error_code, household_id } = await insertHouseholdModelV1(
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
      family_head_img,
      household_img,
      family_head_signature_img
    );

    const responseMap = {
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

    const resData = responseMap[error_code] || {
      status: 500,
      message: "Unknown error occurred.",
    };

    return res.status(resData.status).json({
      success: resData.status === 200,
      message: resData.message,
      ...(resData.status === 200 && { household_id }), // Only include if success
    });

  } catch (error) {
    console.error("insertHouseholdV1 error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred.",
    });
  }
};


export const offlineSyncSurveyData = async (req, res) => {
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
    family_members
  } = req.body;

  if (!user_id || !Array.isArray(family_members) || family_members.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required input fields or family member data.",
    });
  }

  try {
    // First insert household
    const { error_code, household_id } = await insertHouseholdModelV1(
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

    const responseMap = {
      0: "Household inserted successfully",
      1: "Invalid user ID.",
      2: "Invalid state ID.",
      3: "Invalid district ID.",
      4: "Invalid sub-division ID.",
      5: "Invalid block ID.",
      6: "Invalid GP ID.",
      7: "Invalid village ID.",
      8: "Duplicate survey ID.",
      9: "Internal server error.",
    };

    if (error_code !== 0 || !household_id) {
      return res.status(error_code === 9 ? 500 : 400).json({
        success: false,
        message: responseMap[error_code] || "Unknown error",
      });
    }

    // Now insert family members
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
            remarks
          );

          if (healthResult !== 0) {
            memberResult.health = "failed";
          }
        }
      } catch {
        memberResult.health = "failed";
      }

      try {
        const livelihoodResult = await insertLivelihoodModel(
          household_id,
          shg_member,
          wants_to_join_shg,
          training_required,
          training_option
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
          old_age_pension
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
      (m) => m.health === "failed" || m.livelihood === "failed" || m.welfare === "failed"
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

export const insertHouseHoldAndFamilyMembersData = async (req, res) => {
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
    family_members,
    family_head_img = null,
    household_img = null,
    family_head_signature_img = null
  } = req.body;

  if (!user_id || !Array.isArray(family_members) || family_members.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required input fields or family member data.",
    });
  }

  try {
    // First insert household
    const { error_code, household_id } = await insertHouseholdModelV1(
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
      family_head_img,
      household_img,
      family_head_signature_img
    );

    const responseMap = {
      0: "Household inserted successfully",
      1: "Invalid user ID.",
      2: "Invalid state ID.",
      3: "Invalid district ID.",
      4: "Invalid sub-division ID.",
      5: "Invalid block ID.",
      6: "Invalid GP ID.",
      7: "Invalid village ID.",
      8: "Duplicate survey ID.",
      9: "Internal server error.",
    };

    if (error_code !== 0 || !household_id) {
      return res.status(error_code === 9 ? 500 : 400).json({
        success: false,
        message: responseMap[error_code] || "Unknown error",
      });
    }

    // Now insert family members
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
            remarks
          );

          if (healthResult !== 0) {
            memberResult.health = "failed";
          }
        }
      } catch {
        memberResult.health = "failed";
      }

      try {
        const livelihoodResult = await insertLivelihoodModel(
          household_id,
          shg_member,
          wants_to_join_shg,
          training_required,
          training_option
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
          old_age_pension
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
      (m) => m.health === "failed" || m.livelihood === "failed" || m.welfare === "failed"
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


export const offlineSyncSurveyAllData = async (req, res) => {
  const { households } = req.body; // Expecting an array of households

  if (!Array.isArray(households) || households.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid input data.",
    });
  }

  const allResults = [];

  try {
    for (const householdData of households) {
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
        family_members
      } = householdData;

      if (!user_id || !Array.isArray(family_members) || family_members.length === 0) {
        allResults.push({
          success: false,
          message: "Missing required input fields or family member data."
        });
        continue;
      }

      const { error_code, household_id } = await insertHouseholdModelV1(
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

      const responseMap = {
        0: "Household inserted successfully",
        1: "Invalid user ID.",
        2: "Invalid state ID.",
        3: "Invalid district ID.",
        4: "Invalid sub-division ID.",
        5: "Invalid block ID.",
        6: "Invalid GP ID.",
        7: "Invalid village ID.",
        8: "Duplicate survey ID.",
        9: "Internal server error.",
      };

      if (error_code !== 0 || !household_id) {
        allResults.push({
          success: false,
          message: responseMap[error_code] || "Unknown error"
        });
        continue;
      }

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
          has_disability,
          disability_type,
          disability_percentage
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
              has_disability,
              disability_type,
              disability_percentage
            );

            if (healthResult !== 0) {
              memberResult.health = "failed";
            }
          }
        } catch {
          memberResult.health = "failed";
        }

        try {
          const livelihoodResult = await insertLivelihoodModel(
            household_id,
            shg_member,
            wants_to_join_shg,
            training_required,
            training_option
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
            old_age_pension
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
        (m) => m.health === "failed" || m.livelihood === "failed" || m.welfare === "failed"
      );

      if (failedMembers.length > 0) {
        allResults.push({
          success: false,
          message: "Some records failed to save",
          household_id,
          data: resultMessages
        });
      } else {
        allResults.push({
          success: true,
          message: "Household and all family data inserted successfully",
          household_id,
          data: resultMessages
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "All data processed",
      data: allResults,
    });

  } catch (error) {
    console.error("offlineSyncSurveyAllData error:", error.message);
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


