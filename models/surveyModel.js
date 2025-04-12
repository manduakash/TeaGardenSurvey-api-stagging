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
    total_members
  ) {
    try {
      const [rows] = await pool.query(
        "CALL sp_insertHousehold(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@p_ErrorCode);",
        [
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
        ]
      );
  
      console.log("rows", rows);
      const [[errorResult]] = await pool.query("SELECT @p_ErrorCode as ErrorCode");
  
      return errorResult.ErrorCode;
      // If you add an error code return from the SP later, you can fetch and return it here.
     
    } catch (e) {
      console.log(e.message);
      return 1; // Failure
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
          remarks
        ]
      );
  
      console.log("rows", rows);
      const [[{ error_code }]] = await pool.query("SELECT @p_error_code AS error_code");
  
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
        "CALL ⁠ sp_insertLivelihood(?, ?, ?, ?, ?, @p_error_code);",
        [
          household_id,
          shg_member,
          wants_to_join_shg,
          training_required,
          training_option
        ]
      );
  
      
      const [[{ error_code }]] = await pool.query("SELECT @p_error_code AS error_code");
      console.log("error_code",error_code)
      return error_code; 
      
    } catch (e) {
      console.log(e.message);
      return 1; 
    }
  }
  
  

  export async function insertWelfareModel(
    household_id,
    caste_certificate,
    lakshmir_bhandar,
    swasthya_sathi,
    old_age_pension
  ) {
    try {
      // Call SP with OUT parameter
      const [rows] = await pool.query(
        "CALL sp_insertWelfare(?, ?, ?, ?, ?, @p_error_code);",
        [
          household_id,
          caste_certificate,
          lakshmir_bhandar,
          swasthya_sathi,
          old_age_pension
        ]
      );
  
      // Get the value of the OUT parameter
      const [[{ error_code }]] = await pool.query("SELECT @p_error_code AS error_code");
  
      return error_code; // Return the output error code
    } catch (e) {
      console.log(e.message);
      return 1; // Default failure code
    }
  }
  