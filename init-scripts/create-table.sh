#!/bin/bash

echo "Waiting for LocalStack to be ready..."
sleep 5

echo "Creating DynamoDB table..."
awslocal dynamodb create-table \
    --table-name todos \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region us-east-1

echo "Table creation completed!"