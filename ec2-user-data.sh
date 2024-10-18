#!/bin/bash
yum update -y
yum install -y nodejs npm

# Install Firebase CLI if needed
npm install -g firebase-tools

# Get the deployment package
aws s3 cp s3://my-nextjs-artifacts/deployment-package.zip .
unzip deployment-package.zip

# Install dependencies
npm install

# Set up environment variables (replace with your actual Firebase config)
export FIREBASE_API_KEY={process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
export FIREBASE_AUTH_DOMAIN={process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
export FIREBASE_PROJECT_ID={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
# Add other necessary Firebase config variables

# Start the application
npm run start