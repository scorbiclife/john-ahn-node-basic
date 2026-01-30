const { describe, test, afterAll } = require("@jest/globals");
const supertest = require("supertest");
const { initApp, destroyApp } = require("#src/app");

describe("app", () => {
  let app;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await destroyApp();
  });

  test("is setup correctly", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });
});
