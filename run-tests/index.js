const { execSync } = require("child_process");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ endpoint: "http://localhost:4566" });
const lambda = new AWS.Lambda({ endpoint: "http://localhost:4566" });

exports.handler = async (event) => {
  console.log("Running tests...");

  // Download the code from S3
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const params = { Bucket: bucket, Key: key };

  const data = await s3.getObject(params).promise();
  require("fs").writeFileSync("/tmp/app.zip", data.Body);

  // Unzip the code
  execSync("unzip -o /tmp/app.zip -d /tmp/app");

  // Run tests
  try {
    execSync("cd /tmp/app && npm install && npm test");
    console.log("Tests passed. Triggering deployment...");

    // Trigger deployment
    await lambda
      .invoke({
        FunctionName: "deploy-app",
        InvocationType: "Event",
        Payload: JSON.stringify(event),
      })
      .promise();

    return { statusCode: 200, body: "Tests passed, deployment triggered" };
  } catch (error) {
    console.log("Tests failed:", error);
    return { statusCode: 500, body: "Tests failed" };
  }
};
