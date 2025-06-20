import pool from "../db.js";

export async function getStatesModel() {
  try {
    // Call the stored procedure without parameters
    const [rows] = await pool.query("CALL sp_getStates();");

    console.log("SP Result:", rows);

    // Stored procedures with CALL return nested arrays: rows[0] contains the actual result set
    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching states:", e.message);
    return [];
  }
}

export async function getDistrictsByStateModel(state_id) {
  try {
    const [rows] = await pool.query("CALL sp_getDistrictsByState(?);", [
      state_id,
    ]);

    console.log("SP Result:", rows);

    // If it's a nested result (typical with CALL), return first result set
    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching districts:", e.message);
    return [];
  }
}

export async function getSubDivisionsByDistrictModel(dist_id) {
  try {
    const [rows] = await pool.query("CALL sp_getSubDivisionsByDistrict(?);", [
      dist_id,
    ]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching subdivisions:", e.message);
    return [];
  }
}

export async function getBlocksBySubDivisionModel(sub_div_id) {
  try {
    const [rows] = await pool.query("CALL sp_getBlocksBySubDivision(?);", [
      sub_div_id,
    ]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching blocks:", e.message);
    return [];
  }
}

export async function getGPsByBlockModel(blk_id) {
  try {
    const [rows] = await pool.query("CALL sp_getGPsByBlock(?);", [blk_id]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching GPs:", e.message);
    return [];
  }
}

export async function getTeagardensByGPModel(gp_id) {
  try {
    const [rows] = await pool.query("CALL sp_getTeagardensByGP(?);", [gp_id]);

    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching GPs:", e.message);
    return [];
  }
}

export async function getTotalHouseholdsSurveyedDetailsModel(
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  village_id,
  teagarden_id,
  start_date,
  end_date
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_getTotalHouseholdsSurveyedDetails(?, ?, ?, ?, ?, ?, ?, ?);",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        village_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[1];
  } catch (error) {
    console.error(
      "getTotalHouseholdsSurveyedDetailsModel error:",
      error.message
    );
    throw error;
  }
}

export async function getHealthDetailsWithFiltersModel(
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  village_id,
  start_date,
  end_date,
  nutrition_status,
  bp_status,
  blood_sugar,
  gender,
  household_id,
  age_group
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_getHealthDetailsWithFiltersAndAgeGroup(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        village_id,
        start_date,
        end_date,
        nutrition_status,
        bp_status,
        blood_sugar,
        gender,
        household_id,
        age_group,
      ]
    );
    console.log("rows[0]", rows);
    return rows[0]; // First result set
  } catch (error) {
    console.error("getHealthDetailsWithFiltersModel error:", error.message);
    throw error;
  }
}

export const getMemberDetailsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  village_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getMemberDetails(?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        village_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // MySQL procedures return nested result sets
  } catch (error) {
    console.error("getMemberDetailsModel error:", error.message);
    return [];
  }
};

export const getAllUserTypesModel = async () => {
  try {
    const [rows] = await pool.query("CALL sp_getAllUserTypes()");
    return rows; // Return the result set from the procedure
  } catch (error) {
    console.error("getAllUserTypesModel error:", error.message);
    return [];
  }
};

export const getAllTrainingOptionsModel = async () => {
  try {
    const [rows] = await pool.query("CALL sp_getAllTrainingOptions()");
    return rows[0]; // Returns the first result set from the SP
  } catch (error) {
    console.error("getAllTrainingOptionsModel error:", error.message);
    return [];
  }
};

export const getSurveyorDashboardCountModel = async (surveyor_user_id) => {
  try {
    const [rows] = await pool.query("CALL sp_getSurveyorDashboardCount(?)", [
      surveyor_user_id,
    ]);

    return rows[0]; // MySQL procedures return nested result sets
  } catch (error) {
    console.error("getSurveyorDashboardCountModel error:", error.message);
    return [];
  }
};

export async function getHouseholdSurveyCountAnalyticsModel(
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_getHouseholdSurveyCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First set of rows is the actual result
  } catch (error) {
    logger.error("getHouseholdSurveyCountAnalyticsModel error:", error);
    throw error;
  }
}

export const getHealthDetailsCountAnalyticsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getHealthDetailsCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const getSchemeEnrollmentCountAnalyticsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getSchemeEnrollmentCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const getMigratedLaborAndNonMigratedLaborCountsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getMigratedLaborAndNonMigratedLaborCounts(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error(
      "sp_getMigratedLaborAndNonMigratedLaborCounts error:",
      error.message
    );
    return [];
  }
};

export const getLowBirthWeigthCountAnalyticsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getLowBirthWeigthCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const getWelfareProgramCountAnalyticsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getWelfareProgramCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const gethouseHoldCountAnalyticsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  teagarden_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_gethouseHoldCountAnalytics(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        teagarden_id,
        start_date,
        end_date,
      ]
    );

    return rows[0]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const getTotalWelfareDetailsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  village_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getTotalWelfareDetails(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        village_id,
        start_date,
        end_date,
      ]
    );

    return rows[1]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};

export const getTotalLivelihoodDetailsModel = async (
  state_id,
  district_id,
  subdivision_id,
  block_id,
  gp_id,
  village_id,
  start_date,
  end_date
) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_getTotalLivelihoodDetails(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        state_id,
        district_id,
        subdivision_id,
        block_id,
        gp_id,
        village_id,
        start_date,
        end_date,
      ]
    );

    return rows[1]; // First result set from SP
  } catch (error) {
    logger.error("getHealthDetailsCountAnalyticsModel error:", error.message);
    return [];
  }
};