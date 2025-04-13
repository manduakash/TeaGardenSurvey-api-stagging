import fs from 'fs';
import path from 'path';

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

    const publicURL = `${req.protocol}://${req.get('host')}/uploads/${name}`;

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
