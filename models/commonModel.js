

import pool from "../db.js";

export async function getDashboardCountsModel(
    subDiv,
    blk,
    gp,
    village
  ) {
    try {
      // Call the stored procedure with parameters
      const [rows] = await pool.query(
        "CALL sp_getDashboardCounts(?, ?, ?, ?);",
        [
          subDiv,
          blk,
          gp,
          village
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