const { describe, test, beforeAll, afterAll } = require("@jest/globals");
const {
  getGlobalConnection,
  initGlobalConnection,
} = require("#src/db/globalConnection.js");

describe("the global database connection", () => {
  beforeAll(async () => {
    await initGlobalConnection();
  });

  afterAll(async () => {
    await getGlobalConnection().close();
  });

  test("should be setup correctly", () => {
    const globalConnection = getGlobalConnection();
    expect(globalConnection).toBeDefined();
    expect(globalConnection.constructor).not.toBe(Promise);
  });
});
