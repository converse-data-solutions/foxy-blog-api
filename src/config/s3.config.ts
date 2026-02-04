import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});


export const uploadToS3 = async (
  file: Express.Multer.File,
  key: string
): Promise<string> => {   
  const uploader = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
  });

  const result = await uploader.done();

  if (!result.Location) {
    throw new Error("S3 upload failed");
  }

  return result.Location;
};
