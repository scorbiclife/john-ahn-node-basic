const { describe, test } = require("@jest/globals");
const supertest = require("supertest");
const app = require("#src/app");

describe("app", () => {
  test("is setup correctly", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });
});
