const { describe, test } = require("@jest/globals");
const { createConnection } = require("#src/db/connection.js");

describe("the database connection", () => {
  test("should be able to connect", async () => {
    const sequelize = await createConnection();
    expect(sequelize).toBeDefined();
    await sequelize.close();
  });
});
