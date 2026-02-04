const { describe, test, expect } = require("@jest/globals");
const supertest = require("supertest");
const models = require("#root/models");
const { initApp, getApp, destroyApp } = require("#src/app.js");
const { testSignup, testLogin } = require("#root/src/user/test.lib.js");
const { SESSION_COOKIE_KEY } = require("#src/config/password.js");
const { ME_ROUTE, LOGOUT_ROUTE } = require("#src/config/routes.js");

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
    test("should not allow login with wrong password", async () => {
      const username = "user-wrong-password-52NBVM7A";
      const password = "correct-password";
      const email = "user-52NBVM7A@example.com";
      const signupResponse = await testSignup({ username, password, email });
      expect(signupResponse.status).toBe(201);

      const loginResponse = await testLogin({
        email,
        password: "wrong-password",
      });
      expect(loginResponse.status).toBe(401);
    });

    test("should be able to login after signing up", async () => {
      const username = "user-y6srla7o";
      const password = "password";
      const email = "user-y6srla7o@example.com";
      const signupResponse = await testSignup({ username, password, email });
      expect(signupResponse.status).toBe(201);

      const loginResponse = await testLogin({ username, password, email });
      expect(loginResponse.status).toBe(200);
      const cookies = loginResponse.headers["set-cookie"];
      expect(Array.isArray(cookies)).toBe(true);
      expect(cookies.length).not.toBe(0);
      expect(cookies).toEqual(
        expect.arrayContaining([expect.stringContaining(SESSION_COOKIE_KEY)]),
      );
    });

    test("should not allow unauthenticated access to me route", async () => {
      const meResponse = await supertest(getApp()).get(ME_ROUTE);
      expect(meResponse.status).toBe(401);
    });

    test("should be able to authenticate with the cookie after login", async () => {
      const username = "user-authn-cookie-xK9m";
      const password = "password";
      const email = "user-authn-cookie-xK9m@example.com";
      const signupResponse = await testSignup({ username, password, email });
      expect(signupResponse.status).toBe(201);

      const loginResponse = await testLogin({ email, password });
      expect(loginResponse.status).toBe(200);

      const cookie = loginResponse.headers["set-cookie"]
        .find((c) => c.startsWith(SESSION_COOKIE_KEY))
        .split(";")[0];

      const meResponse = await supertest(getApp())
        .get(ME_ROUTE)
        .set("Cookie", cookie);
      expect(meResponse.status).toBe(200);
    });
    test("should not be able to access me route after logout", async () => {
      const username = "user-logout-rEvk4";
      const password = "password";
      const email = "user-logout-rEvk4@example.com";
      const signupResponse = await testSignup({ username, password, email });
      expect(signupResponse.status).toBe(201);

      const loginResponse = await testLogin({ email, password });
      expect(loginResponse.status).toBe(200);

      const cookie = loginResponse.headers["set-cookie"]
        .find((c) => c.startsWith(SESSION_COOKIE_KEY))
        .split(";")[0];

      const logoutResponse = await supertest(getApp())
        .post(LOGOUT_ROUTE)
        .set("Cookie", cookie);
      expect(logoutResponse.status).toBe(200);

      const meResponse = await supertest(getApp())
        .get(ME_ROUTE)
        .set("Cookie", cookie);
      expect(meResponse.status).toBe(401);
    });
  });
});
