const config = {
  dynamodb: {
    endpoint:
      process.env.NODE_ENV === "development"
        ? "http://localstack:4566" // Docker service name
        : undefined,
    region: "us-east-1",
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  },
};

export default config;
