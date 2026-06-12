// Cloudinary Upload Utility
// Plain fetch — no SDK required. Uses unsigned upload preset.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const FOLDER = 'prince_vegetables';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Upload a File object to Cloudinary and return the secure URL.
 * @param {File} file - The image file to upload
 * @param {object} [options]
 * @param {(progress: number) => void} [options.onProgress] - Called with 0–100 progress value
 * @returns {Promise<string>} Cloudinary secure URL with auto optimizations applied
 */
export const uploadToCloudinary = (file, { onProgress } = {}) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', FOLDER);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', CLOUDINARY_UPLOAD_URL);

    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          if (!data.secure_url) {
            reject(new Error('Cloudinary response missing secure_url'));
            return;
          }

          // Return URL with auto format + quality transformations injected
          resolve(buildOptimizedUrl(data.secure_url));
        } catch {
          reject(new Error('Failed to parse Cloudinary response'));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData?.error?.message ?? `Cloudinary upload failed (HTTP ${xhr.status})`));
        } catch {
          reject(new Error(`Cloudinary upload failed (HTTP ${xhr.status})`));
        }
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during Cloudinary upload')));
    xhr.addEventListener('abort', () => reject(new Error('Cloudinary upload was aborted')));

    xhr.send(formData);
  });

/**
 * Inject Cloudinary transformation params into an existing Cloudinary URL.
 * Applies: f_auto (WebP/AVIF auto), q_auto (smart compression), w_600 (max width)
 * Safe to call on non-Cloudinary URLs — returns them unchanged.
 * @param {string} url
 * @param {string} [transforms] - Cloudinary transformation string
 * @returns {string}
 */
export const buildOptimizedUrl = (url, transforms = 'f_auto,q_auto,w_600') => {
  if (!url || typeof url !== 'string') return url;

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  // Avoid double-inserting transforms
  if (url.includes(transforms)) return url;

  // Insert before /upload/ segment
  return url.replace('/upload/', `/upload/${transforms}/`);
};

/**
 * Build a Cloudinary URL for a known public_id (from the prince_vegetables folder).
 * Useful for referring to manually-uploaded images by filename.
 * @param {string} publicId - e.g. "prince_vegetables/tomato"
 * @param {string} [transforms]
 * @returns {string}
 */
export const buildCloudinaryUrl = (publicId, transforms = 'f_auto,q_auto,w_600') => {
  if (!CLOUD_NAME) return '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
};
