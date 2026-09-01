const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Generate a presigned URL for direct browser-to-R2 upload
 */
const getPresignedUploadUrl = async (originalFilename, contentType) => {
  const ext = path.extname(originalFilename || '') || '.jpg';
  const key = `pins/${uuidv4()}${ext}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
  const publicUrlBase = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');
  const publicUrl = `${publicUrlBase}/${key}`;

  return { uploadUrl, publicUrl, key };
};

/**
 * Upload a file buffer directly to Cloudflare R2
 */
const uploadBufferToR2 = async (buffer, originalFilename, contentType) => {
  const ext = path.extname(originalFilename || '') || '.jpg';
  const key = `pins/${uuidv4()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await r2Client.send(command);
  const publicUrlBase = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');
  const publicUrl = `${publicUrlBase}/${key}`;

  return { publicUrl, key };
};

module.exports = {
  r2Client,
  getPresignedUploadUrl,
  uploadBufferToR2,
};

