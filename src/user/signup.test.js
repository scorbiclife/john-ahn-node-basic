const { describe, test, expect } = require("@jest/globals");
const supertest = require("supertest");
const { SIGNUP } = require("#src/config/routes.js");
const { initApp, destroyApp, getApp } = require("../app.js");

describe("signup", () => {
  beforeAll(initApp);
  afterAll(destroyApp);

  test("should allow signup with required user information", async () => {
    const username = "user-sWhqfFXZ";
    const password = "password";
    const email = "user-sWhqfFXZ@example.com";
    const app = getApp();
    const response = await supertest(app)
      .post(SIGNUP)
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .send({
        username,
        password,
        email,
      });
    expect(response.status).toBe(201);
  });

  test("should not allow signup with duplicate email", async () => {
    const username1 = "user-xyMq1+Y3-v01";
    const username2 = "user-xyMq1+Y3-v02";
    const password1 = "password01";
    const password2 = "password02";
    const email = "user-xyMq1+Y3@example.com";
    const app = getApp();
    const response1 = await supertest(app)
      .post(SIGNUP)
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .send({
        username: username1,
        password: password1,
        email: email,
      });
    expect(response1.status).toBe(201);

    const response2 = await supertest(app)
      .post(SIGNUP)
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .send({
        username: username2,
        password: password2,
        email: email,
      });
    expect(response2.status).toBe(400);
  });
});
