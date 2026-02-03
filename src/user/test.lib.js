const supertest = require("supertest");
const { SIGNUP_ROUTE, LOGIN_ROUTE } = require("#src/config/routes.js");
const { getApp } = require("#src/app.js");

module.exports.testSignup = async function testSignup({
  username,
  password,
  email,
  ...requestBody
}) {
  const app = getApp();
  const response = await supertest(app)
    .post(SIGNUP_ROUTE)
    .set("content-type", "application/json")
    .set("accept", "application/json")
    .send({
      username,
      password,
      email,
      ...requestBody,
    });
  return response;
};

module.exports.testLogin = async function testLogin({
  email,
  password,
  ...requestBody
}) {
  const app = getApp();
  const response = await supertest(app)
    .post(LOGIN_ROUTE)
    .set("content-type", "application/json")
    .set("accept", "application/json")
    .send({
      email,
      password,
      ...requestBody,
    });
  return response;
};
