#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "Starting CI/CD pipeline"

# Step 1: Build
echo "Building application..."
npm run build

# Step 2: Run unit tests
echo "Running unit tests..."
npm run test

# Step 3: Create deployment package
echo "Creating deployment package..."
zip -r deployment-package.zip .next package.json package-lock.json

# Step 4: Upload to S3
echo "Ensuring S3 bucket exists..."
awslocal s3 mb s3://my-nextjs-artifacts 2>/dev/null || true
echo "Uploading deployment package to S3..."
awslocal s3 cp deployment-package.zip s3://my-nextjs-artifacts/deployment-package.zip

# Step 5: Ensure security group exists and has correct ingress rule
echo "Checking security group..."
SG_ID=$(awslocal ec2 describe-security-groups --group-names my-sg --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || \
        awslocal ec2 create-security-group --group-name my-sg --description "My security group" --query 'GroupId' --output text)

echo "Security Group ID: $SG_ID"

# Add ingress rule (this will fail silently if the rule already exists)
awslocal ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0 2>/dev/null || true

# Step 6: Deploy to EC2
echo "Deploying to EC2..."
INSTANCE_ID=$(awslocal ec2 run-instances \
  --image-id ami-12345678 \
  --count 1 \
  --instance-type t2.micro \
  --key-name my-key-pair \
  --security-group-ids $SG_ID \
  --user-data file://ec2-user-data.sh \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "Deployed to new instance: $INSTANCE_ID"

# Step 7: Get public IP (simulated in LocalStack)
PUBLIC_IP=$(awslocal ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "Deployment complete. Your application is deployed at: http://$PUBLIC_IP"