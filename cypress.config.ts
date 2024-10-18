import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {},
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    taskTimeout: 60000,
  },
});
