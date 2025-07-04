import pool from "../db.js";


export async function createUserModel(
    Username,
    PasswordHash,
    FullName,
    ContactNo,
    UserTypeID,
    StateID,
    DistrictID,
    SubDivisionID,
    BlockID,
    GPID,
    CreatedBy
  ) {
    try {
      // Use a query with the correct number of parameters
      const [rows] = await pool.query(
        "CALL sp_createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@p_ErrorCode);",
        [
          Username,
          PasswordHash,
          FullName,
          ContactNo,
          UserTypeID,
          StateID,
          DistrictID,
          SubDivisionID,
          BlockID,
          GPID,
          CreatedBy
        ]
      );

      // Fetch the output parameter `@p_ErrorCode`
      const [[errorResult]] = await pool.query("SELECT @p_ErrorCode as ErrorCode");
  
      return errorResult.ErrorCode; // Return the error code
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

    export async function getAllUsersModel() {
    try {
      const [rows] = await pool.query("CALL sp_getAllUsers();");
      return rows[0];
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }
