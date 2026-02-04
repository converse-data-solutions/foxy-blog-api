import path from "path";

/**
 * Convert env values like "5MB", "500KB" to bytes
 */
const parseFileSize = (value: string): number => {
  const size = value.toUpperCase().trim();
  const number = parseInt(size, 10);

  if (size.endsWith("MB")) return number * 1024 * 1024;
  if (size.endsWith("KB")) return number * 1024;

  return number;
};


export const uploadConfig = {
  /**
   * Local static upload directory
   * Example: ./public
   */
  staticPath: path.resolve(
    process.cwd(),
    process.env.STATIC_FILES_PATH!
  ),

  /**
   * Max file size in bytes
   * Example: 5MB
   */
  maxFileSize: parseFileSize(
    process.env.UPLOAD_MAX_SIZE!
  ),

  /**
   * Allowed mime types
   * Example: image/jpeg,image/png
   */
  allowedMimeTypes: (
    process.env.UPLOAD_ALLOWED_FILE_TYPES!
  ).split(","),
};
