import jwt from "jsonwebtoken";
import { decryptAES, encryptAES } from "./aes.js";

// Secret key (use a strong secret & store it in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "3h"; // Token expiry time (e.g., 1h, 7d, etc.)

/**
 * Generate JWT Token
 * @param {Object} payload - Data to encode in the JWT
 * @returns {string} JWT Token
 */
export function generateJWT(payload) {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    const encryptedToken = encryptAES(token);
    return encryptedToken;
  } catch (err) {
    console.log(err);
    return null; // Error generating token
  }
}

/**
 * Verify JWT Token
 * @param {string} token - The JWT token to verify
 * @returns {Object|boolean} Decoded payload or false if verification fails
 */
export function verifyJWT(token) {
  try {
    const decryptedToken = decryptAES(token);
    return jwt.verify(decryptedToken, JWT_SECRET);
  } catch (error) {
    console.log("JWT Verification Failed:", error.message);
    return false; // Invalid token
  }
}
