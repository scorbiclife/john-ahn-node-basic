const { describe, test, expect } = require("@jest/globals");
const models = require("#root/models");
const { initApp, destroyApp } = require("#src/app.js");
const { testSignup, testLogin } = require("#root/src/user/test.lib.js");


describe("user", () => {
  beforeAll(initApp);
  afterAll(destroyApp);

  describe("signup", () => {
    test("should allow signup with required user information", async () => {
      const username = "user-sWhqfFXZ";
      const password = "password";
      const email = "user-sWhqfFXZ@example.com";
      const response = await testSignup({ username, password, email });
      expect(response.status).toBe(201);
    });

    test("should not allow signup with duplicate email", async () => {
      const username1 = "user-xyMq1+Y3-v01";
      const username2 = "user-xyMq1+Y3-v02";
      const password1 = "password01";
      const password2 = "password02";
      const email = "user-xyMq1+Y3@example.com";

      const response1 = await testSignup({
        username: username1,
        password: password1,
        email,
      });
      expect(response1.status).toBe(201);

      const response2 = await testSignup({
        username: username2,
        password: password2,
        email,
      });
      expect(response2.status).toBe(400);
    });

    test("should not store the password as plaintext", async () => {
      const username = "user-bzibujgz";
      const password = "password";
      const email = "user-bzibujgz@example.com";
      const response = await testSignup({ username, password, email });
      const savedUser = await models.User.findOne({ where: { email } });
      expect(savedUser).not.toBeNull();
      expect(savedUser.password).not.toBe(password);
    });
  });

  describe("login", () => {
    test("should be able to login after signing up", async () => {
      const username = "user-y6srla7o";
      const password = "password";
      const email = "user-y6srla7o@example.com";
      const signupResponse = await testSignup({ username, password, email });
      expect(signupResponse.status).toBe(201);

      const loginResponse = await testLogin({ username, password, email });
      expect(loginResponse.status).toBe(200);
    });
  });
});
