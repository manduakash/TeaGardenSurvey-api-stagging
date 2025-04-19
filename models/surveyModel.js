import pool from "../db.js";

export async function insertHouseholdModel(
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
) {
  try {
    const params = [
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
    ];

    console.log("Calling sp_insertHousehold with params:", params);

    await pool.query(
      "CALL sp_insertHousehold(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,@p_error_code);",
      params
    );

    const [[{ error_code }]] = await pool.query(
      "SELECT @p_error_code AS error_code"
    );

    return error_code;

    // Fallback to generic error if something's off
  } catch (error) {
    console.error("insertHouseholdModel error:", error.message);
    return 9; // General error fallback
  }
}

export async function insertHealthModel(
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
) {
  try {
    const [rows] = await pool.query(
      "CALL sp_insertHealth(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@p_error_code);",
      [
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
      ]
    );

    console.log("rows", rows);
    const [[{ error_code }]] = await pool.query(
      "SELECT @p_error_code AS error_code"
    );

    return error_code;
  } catch (e) {
    console.log(e.message);
    return 1; // Failure
  }
}

export async function insertLivelihoodModel(
  household_id,
  shg_member,
  wants_to_join_shg,
  training_required,
  training_option
) {
  try {
    const [rows] = await pool.query(
      "CALL  sp_insertLivelihood(?, ?, ?, ?, ?, @p_error_code);",
      [
        household_id,
        shg_member,
        wants_to_join_shg,
        training_required,
        training_option,
      ]
    );

    const [[{ error_code }]] = await pool.query(
      "SELECT @p_error_code AS error_code"
    );
    console.log("error_code", error_code);
    return error_code;
  } catch (e) {
    console.log(e.message);
    return 1;
  }
}

export async function insertWelfareModel(
  household_id,
  caste_certificate,
  caste_certificate_id_no="",
  lakshmir_bhandar,
  lakshmir_bhandar_card_no="",
  swasthya_sathi,
  swasthya_sathi_card_no="",
  old_age_pension,
  old_age_pension_id_no=""
) {
  try {
    // Call SP with all input parameters and the OUT parameter
    const [rows] = await pool.query(
      "CALL sp_insertWelfare(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_error_code);",
      [
        household_id,
        caste_certificate,
        caste_certificate_id_no,
        lakshmir_bhandar,
        lakshmir_bhandar_card_no,
        swasthya_sathi,
        swasthya_sathi_card_no,
        old_age_pension,
        old_age_pension_id_no
      ]
    );

    // Get the value of the OUT parameter
    const [[{ error_code }]] = await pool.query(
      "SELECT @p_error_code AS error_code"
    );

    return error_code; // Return the output error code
  } catch (e) {
    console.log(e.message);
    return 1; // Default failure code
  }
}


export async function insertHouseholdModelV1(
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
  family_head_img = null,
  household_img = null,
  family_head_signature_img = null
) {
  try {
    const params = [
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
      family_head_img,
      household_img,
      family_head_signature_img
    ];

    console.log("Calling sp_insertHouseholdV1 with params:", params);

    // Call the stored procedure with 3 new image inputs + 2 OUT params
    await pool.query(
      "CALL sp_insertHouseholdV1(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_error_code, @p_household_id);",
      params
    );

    // Fetch the OUT parameters
    const [[result]] = await pool.query(
      "SELECT @p_error_code AS error_code, @p_household_id AS household_id"
    );

    return {
      error_code: result.error_code,
      household_id: result.household_id
    };
  } catch (error) {
    console.error("insertHouseholdModelV1 error:", error.message);
    return {
      error_code: 9,
      household_id: null
    };
  }
}



export const insertTrainingOptionModel = async (training_name) => {
  try {
    const [rows] = await pool.query(
      "CALL sp_insertTrainingOption(?, @p_status_code);",
      [training_name]
    );

    const [[statusResult]] = await pool.query("SELECT @p_status_code AS status_code");

    return statusResult?.status_code ?? 9; // Default to internal error
  } catch (error) {
    console.error("insertTrainingOptionModel error:", error.message);
    return 9;
  }
};

