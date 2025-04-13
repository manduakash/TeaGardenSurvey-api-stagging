import pool from "../db.js";



// export async function insertHouseholdModel(
//   state,
//   district,
//   sub_division,
//   block,
//   gp,
//   village,
//   house_number,
//   latitude,
//   longitude,
//   family_income,
//   total_members,
//   user_id
// ) {
//   try {
//     const [rows] = await pool.query(
//       "CALL sp_insertHousehold(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@p_error_code);",
//       [
//         state,
//         district,
//         sub_division,
//         block,
//         gp,
//         village,
//         house_number,
//         latitude,
//         longitude,
//         family_income,
//         total_members,
//         user_id,
//       ]
//     );
// console.log([
//   state,
//   district,
//   sub_division,
//   block,
//   gp,
//   village,
//   house_number,
//   latitude,
//   longitude,
//   family_income,
//   total_members,
//   user_id,
// ])
//     const [[errorRow]] = await pool.query("SELECT @p_error_code AS ErrorCode");
//     return errorRow?.ErrorCode ?? 9;
//   } catch (error) {
//     console.error("insertHouseholdModel error:", error.message);
//     return 9; // Default to internal error
//   }
// }

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
  user_id
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
      user_id
    ];

    console.log("Calling sp_insertHousehold with params:", params);

    await pool.query("CALL sp_insertHousehold(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@p_error_code);", params);

    const [[{ error_code }]] = await pool.query("SELECT @p_error_code AS error_code");
  
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
        "CALL  sp_insertLivelihood(?, ?, ?, ?, ?, @p_error_code);",
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
  