import { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

interface DynamoDBError extends Error {
  name: string;
  $metadata?: {
    httpStatusCode: number;
    requestId: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const command = new CreateTableCommand({
      TableName: "todos",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    await client.send(command);
    res.status(200).json({ message: "Table created successfully" });
  } catch (error) {
    const dynamoError = error as DynamoDBError;

    // If table already exists, that's fine
    if (dynamoError.name === "ResourceInUseException") {
      return res.status(200).json({ message: "Table already exists" });
    }

    console.error("Error creating table:", dynamoError);
    res.status(500).json({
      message: "Error creating table",
      error: dynamoError.message,
    });
  }
}
