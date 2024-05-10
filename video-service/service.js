const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Create S3 instance
const s3 = new AWS.S3();

const bucketName = process.env.AWS_S3_BUCKET;

// Function to generate pre-signed URL for upload
async function generateUploadUrl(objectKey, contentType) {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    ContentType: contentType,
    //ACL: 'public-read', 
    Expires: 3600 // URL expiration time in seconds (1 hour in this example)
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

module.exports = { generateUploadUrl };