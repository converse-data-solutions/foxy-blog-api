import { Request, Response } from "express";
import path from "path";
import { uploadConfig } from "../../config/upload.validation";
import { uploadToS3 } from "../../config/s3.config";
import { AuthRequest } from "../../types/auth-request";
import { getUploadFolder } from "../../config/multer.config";
import { HttpError } from "../../common/utils/httpError";

export const ImageController = {
async upload(req: Request, res: Response) {
  const authReq = req as AuthRequest;

  if (!req.file) {
    throw new HttpError("Image file is required", 400);
  }

  const folder = getUploadFolder(req);
  const file = req.file;
  let imageUrl: string;

  if (process.env.NODE_ENV === "production") {
    const ext = path.extname(file.originalname);
    const key = `${folder}/${Date.now()}${ext}`;

    imageUrl = await uploadToS3(file, key);
  } else {
    const relativePath = path
      .relative(uploadConfig.staticPath, file.path)
      .replace(/\\/g, "/");

    imageUrl = `${process.env.SERVER_URL}/uploads/${relativePath}`;
  }

  return res.status(201).json({
    message: "Image uploaded successfully",
    url: imageUrl,
  });
},


  /* ---------- GALLERY ---------- */
  async uploadGallery(req: Request, res: Response) {
  const authReq = req as AuthRequest;
  

  if (!Array.isArray(req.files)) {
    throw new HttpError("Images are required", 400);
  }

  const folder = getUploadFolder(req);
  const results = [];

  for (const file of req.files as Express.Multer.File[]) {
    let imageUrl: string;

    if (process.env.NODE_ENV === "production") {
      const ext = path.extname(file.originalname);
      const key = `${folder}/${Date.now()}${ext}`;

      imageUrl = await uploadToS3(file, key);
    } else {
      const relativePath = path
        .relative(uploadConfig.staticPath, file.path)
        .replace(/\\/g, "/");

      imageUrl = `${process.env.SERVER_URL}/uploads/${relativePath}`;
    }

    results.push({ url: imageUrl });
  }

  return res.status(201).json({
    message: "Gallery images uploaded successfully",
    images: results,
  });
}

};
