const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME;

/**
 * Generates a Cloudinary URL with transformations for responsive images.
 * @param publicId The public ID or path of the image in Cloudinary.
 * @param options Optional transformations such as width, height, crop, etc.
 * @returns The full Cloudinary URL with transformations applied.
 */
interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: string;
  [key: string]: string | number | undefined;
}

export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  if (!cloudName) {
    console.warn('Cloudinary cloud name is not set in environment variables.');
    return publicId; // fallback to original URL
  }

  const transformations = {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  };

  const transformationString = Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  // If publicId is a full URL, extract the path after the cloudinary base URL
  let imagePath = publicId;
  const cloudinaryBase = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  if (publicId.startsWith(cloudinaryBase)) {
    imagePath = publicId.substring(cloudinaryBase.length);
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${imagePath}`;
}
