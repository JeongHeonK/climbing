import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    testId: "test@test.com",
    testPw: "123123!a",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {},
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
