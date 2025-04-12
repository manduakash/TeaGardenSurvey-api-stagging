import pool from "../db.js";
import logger from "../utils/logger.js";

export async function userLoginModel(Username, PasswordHash) {
  try {
    const [rows] = await pool.query("CALL sp_userLogin(?, ?)", [
      Username,
      PasswordHash,
    ]);
    return rows[0];
  } catch (error) {
    logger.error(error.message);
    throw new Error("DB error: " + error.message);
  }
}

export async function userLogoutModel(UserID) {
  try {
  
    const [rows] = await pool.query("CALL sp_userLogout(?,@p_ErrorCode)", [UserID]);
    
    const [[errorResult]] = await pool.query("SELECT @p_ErrorCode as ErrorCode");
  console.log("errorResult",errorResult);
  
      return errorResult.ErrorCode; 
   
  } catch (error) {
    console.log("error",error)
    logger.error(error.message);
    throw new Error("DB error: " + error.message);
  }
}
