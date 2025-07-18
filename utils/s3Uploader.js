import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const s3Uploader = async (file) => {
  try {
    console.log("s3 file is", file.originalname);
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(params));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Delete a file from S3 given its URL
export const deleteFromS3 = async (fileUrl) => {
  try {
    // Extract the file key from the URL
    const url = new URL(fileUrl);
    const key = decodeURIComponent(url.pathname.replace(/^\//, ""));
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(params));
    return { success: true };
  } catch (error) {
    console.error("S3 delete error:", error);
    return { success: false, error: error.message };
  }
};
