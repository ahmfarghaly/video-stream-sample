# Video upload sample

## Table of Contents

- [About](#about)
- [Prerequisites](#prereq)
- [Usage](#usage)

## About <a name = "about"></a>

This repo demonestrate uploading video to S3 bucket, using AWS SDK's PreSignedURLs.
Its consist of two applications:
- NodeJS backend service 'video-service', which communicate with AWS S3 to generate the presignedUrl for upload
- ReactJS frontend 'video-web', which do the upload over two rquests, request to backend to get preSignedURl, and the actual upload to the presignedUrl.

## Prerequisites <a name = "prereq"></a>

- NodeJS
- AWS Account with S3 proper permissions & S3 bucket.

## Installing & Usage <a name = "usage"></a>

On video-service:
- provide .env file with AWS settings:
AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET

On each app folder run:
- npm install
- npm start

Then open browser on http://localhost:3000

