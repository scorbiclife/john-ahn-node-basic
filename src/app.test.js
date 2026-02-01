const { describe, test, afterAll } = require("@jest/globals");
const supertest = require("supertest");
const { initApp, getApp, destroyApp } = require("#src/app");

describe("app", () => {
  beforeAll(async () => {
    await initApp();
  })

  afterAll(async () => {
    await destroyApp();
  })

  test("is setup correctly", async () => {
    const app = getApp();
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });
});
