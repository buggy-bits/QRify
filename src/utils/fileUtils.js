/**
 * Convert a file to a data URL
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - A promise that resolves to the data URL
 */
export const convertToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Validate URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate JSON format
 * @param {string} jsonString - The JSON string to validate
 * @returns {boolean} - Whether the JSON is valid
 */
export const isValidJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Format file size in a human-readable format
 * @param {number} bytes - The size in bytes
 * @returns {string} - Formatted size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 