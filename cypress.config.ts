import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.ts",
    supportFile: "cypress/support/index.ts",
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
  },
});
