const { describe, test, expect } = require("@jest/globals");
const { User, sequelize, Sequelize } = require("#root/models");
const { initApp, destroyApp } = require("#src/app");

describe("user", () => {
  beforeAll(initApp);
  afterAll(destroyApp);

  test("should be created with only the required parameters", async () => {
    const username = "user";
    const password = "pass";
    const email = "user@example.com";
    let user;
    await expect(async () => {
      user = await User.create({ username, password, email });
    }).resolves.toBeUndefined();
    expect(user).toBeDefined();
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
  });

  test("should not be created with the required params missing", async () => {
    await expect(async () => {
      return await User.create({
        username: "user",
        password: "pass",
        // email: "user@example.com",
      });
    }).rejects.toBeInstanceOf(Sequelize.ValidationError);

    await expect(async () => {
      return await User.create({
        username: "user",
        // password: "pass",
        email: "user@example.com",
      });
    }).rejects.toBeInstanceOf(Sequelize.ValidationError);

    await expect(async () => {
      return await User.create({
        // username: "user",
        password: "pass",
        email: "user@example.com",
      });
    }).rejects.toBeInstanceOf(Sequelize.ValidationError);
  });
});
