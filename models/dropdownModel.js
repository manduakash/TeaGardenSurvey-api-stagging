import pool from "../db.js";

export async function getDistrictsByStateModel(state_id) {
  try {
    const [rows] = await pool.query("CALL sp_getDistrictsByState(?);",[state_id]);
    
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
    const [rows] = await pool.query("CALL sp_getSubDivisionsByDistrict(?);", [dist_id]);
    
    console.log("SP Result:", rows);

    return rows?.[0] || [];
  } catch (e) {
    console.error("Error fetching subdivisions:", e.message);
    return [];
  }
}


export async function getBlocksBySubDivisionModel(sub_div_id) {
  try {
    const [rows] = await pool.query("CALL sp_getBlocksBySubDivision(?);", [sub_div_id]);

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
