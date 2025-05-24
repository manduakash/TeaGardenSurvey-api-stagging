import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadBase64Image = async (req, res) => {
  const { image, filename } = req.body;

  if (!image) {
    return res.status(400).json({ success: false, message: 'No image data provided' });
  }

  try {
    // Extract MIME type and base64 data
    const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid base64 string' });
    }

    const mimeType = matches[1]; // e.g., image/png
    const imageBuffer = Buffer.from(matches[2], 'base64');

    // Get extension
    const extension = mimeType.split('/')[1]; // e.g., png, jpeg
    const name = `image_${filename}${Date.now()}.${extension}`;
    const uploadPath = path.join(process.cwd(), 'uploads', name);

    fs.writeFileSync(uploadPath, imageBuffer);

    const publicURL = `https://wbassetmgmtservice.link/uploads/${name}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: publicURL,
    });
  } catch (err) {
    console.error('Image upload error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const base64ToFileServer = async (image, filename) => {
  if (!image) {
    return { success: true, message: 'No image data provided', url: null };
  }

  try {
    const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return { success: false, message: 'Invalid base64 string' };
    }

    const mimeType = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');
    const extension = mimeType.split('/')[1];
    const name = `${filename}.${extension}`;

    const uploadDir = path.join(__dirname, '..', 'uploads'); // Adjust as needed
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, name);
    fs.writeFileSync(uploadPath, imageBuffer);

    const publicURL = `/uploads/${name}`;

    return {
      success: true,
      url: publicURL,
    };
  } catch (err) {
    console.log('Error writing file:', err.message);
    
    console.error('Image upload error:', err.message);
    return { success: false, message: 'Server error' };
  }
};