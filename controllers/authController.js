import { userLoginModel, userLogoutModel } from "../models/authModel.js";
import logger from "../utils/logger.js";

export const login = async (req, res) => {
  try {
    const {username, password} = req.body; // get username and password from request

    if (!username  || !password ) {
      // if username or password not provided
      logger.debug(
        // debug logging
        JSON.stringify({
          API: "login",
          REQUEST: {username, password},
          RESPONSE: {
            success: false,
            message: "Invalid username or Password",
          },
        })
      );

      // sending api response to client
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
        data: null,
      });
    }

    // check if user is authenticated
    const rows = await userLoginModel(username , btoa(password));

    if (rows !== undefined && rows[0]?.length !== 0) {
      // debug logging
      logger.debug(
        JSON.stringify({
          API: "login",
          REQUEST: { username , password  },
          RESPONSE: {
            success: true,
            message: "Login successfully",
            data: rows[0],
          },
        })
      );

      // sending api response to client
      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: rows[0],
      });
    } else {
      // if user not authenticated
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    // error logging
    logger.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred, Please try again",
      data: null,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // get user from req
    const { user_id } = req.body;
    console.log("logged out",user_id);
    
    // log out model call
    await userLogoutModel(user_id);

    // debug logging
    logger.debug(
      JSON.stringify({
        API: "logout",
        REQUEST: user_id,
        RESPONSE: {
          success: true,
          message: "Logout successfully",
        },
      })
    );
    // sending api response to client
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    // error logging
    logger.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred, Please try again",
      data: null,
    });
  }
};
