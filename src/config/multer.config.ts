import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadConfig } from "./upload.validation";
import { Request } from "express";

const isProduction = process.env.NODE_ENV === "production";

/* ---------- FOLDER MAP ---------- */
const folderMap: Record<string, string> = {
  avatar: "users/avatars",
  userCover: "users/covers",
  blogCover: "blogs/covers",
  blogGallery: "blogs/gallery",
};

export const getUploadFolder = (req: Request): string => {
  const type = (req.params as { type?: string }).type;
  return folderMap[type || ""] || "temp";
};

/* ---------- DEV: LOCAL STORAGE ---------- */
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = getUploadFolder(req);
    const uploadPath = path.join(uploadConfig.staticPath, folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/* ---------- PROD: MEMORY STORAGE ---------- */
const memoryStorage = multer.memoryStorage();

/* ---------- FILE FILTER ---------- */
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!uploadConfig.allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"));
  }
  cb(null, true);
};

/* ---------- EXPORT ---------- */
export const upload = multer({
  storage: isProduction ? memoryStorage : localStorage,
  fileFilter,
  limits: {
    fileSize: uploadConfig.maxFileSize,
  },
});
