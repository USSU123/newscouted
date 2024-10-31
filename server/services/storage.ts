import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: Express.Multer.File,
  folder: string = 'uploads'
): Promise<string> {
  // Optimize image before upload
  const optimized = await sharp(file.buffer)
    .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  // Convert buffer to base64
  const base64Image = optimized.toString('base64');
  const dataURI = `data:image/jpeg;base64,${base64Image}`;

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(dataURI, {
    folder,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  });

  return result.secure_url;
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = url.split('/').slice(-1)[0].split('.')[0];
  await cloudinary.uploader.destroy(publicId);
}