import { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const scanCommand = new ScanCommand({
          TableName: "todos",
        });
        const scanResponse = await docClient.send(scanCommand);
        return res.status(200).json(scanResponse.Items || []);

      case "POST":
        const { text } = req.body;
        const newTodo = {
          id: Date.now().toString(),
          text,
        };

        const putCommand = new PutCommand({
          TableName: "todos",
          Item: newTodo,
        });
        await docClient.send(putCommand);
        return res.status(201).json(newTodo);

      case "DELETE":
        const { id } = req.query;
        const deleteCommand = new DeleteCommand({
          TableName: "todos",
          Key: { id },
        });
        await docClient.send(deleteCommand);
        return res.status(200).json({ message: "Todo deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
