

import pool from "../db.js";

export async function getDashboardCountsModel(
    dist,
    subDiv,
    blk,
    gp,
    tg
  ) {
    try {
      // Call the stored procedure with parameters
      console.log({ dist,
    subDiv,
    blk,
    gp,
    tg});
      
      const [rows] = await pool.query(
        "CALL sp_getDashboardCounts(?, ?, ?, ?, ?);",
        [
          dist,
          subDiv,
          blk,
          gp,
          tg
        ]
      );
      console.log("rows", rows);
  
      // The stored procedure returns the result set directly
      // Return the first element which contains the actual data
      return rows[0];
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }