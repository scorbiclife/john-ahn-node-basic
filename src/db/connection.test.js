const { describe, test, expect } = require("@jest/globals");
const { sequelize } = require("#root/models");

describe("the database connection", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  test("should be able to connect", async () => {
    expect(sequelize).toBeDefined();
    await expect(async () => {
      await sequelize.authenticate();
    }).resolves.toBeUndefined();
  });
});
