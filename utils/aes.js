import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ENC_SECRET_KEY = process.env.ENC_SECRET_KEY;
const ENC_SECRET_KEY_IV = process.env.ENC_SECRET_KEY_IV;

// AES-256 Key (32 bytes)
const AES_KEY = Buffer.from(ENC_SECRET_KEY, "utf8");

// IV (16 bytes) - Must be stored or sent with the ciphertext
const AES_IV = Buffer.from(ENC_SECRET_KEY_IV, "utf8");

// Encrypt function
export function encryptAES(plaintext) {
  try {
    // Create a cipher object using the AES-256-CBC algorithm and the secret key and IV
    const cipher = crypto.createCipheriv("aes-256-cbc", AES_KEY, AES_IV);
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.log("Error encrypting:", error.message);
    return "";
  }
}

// Decrypt function
export function decryptAES(encryptedData) {
  try {
    // Create a decipher object using the AES-256-CBC algorithm and the secret key and IV
    const decipher = crypto.createDecipheriv("aes-256-cbc", AES_KEY, AES_IV);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.log("Error decrypting:", error.message);
    return "";
  }
}

// Example
// const plaintext = "Hello, AES!";
// const encryptedText = encryptAES(plaintext);
// console.log("🔒 Encrypted:", encryptedText);

// const decryptedText = decryptAES(encryptedText);
// console.log("🔓 Decrypted:", decryptedText);
