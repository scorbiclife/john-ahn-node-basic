const { describe, test, expect } = require("@jest/globals");
const { hashPassword, verifyPassword } = require("./index.js");

describe("password hash function", () => {
  test("should not be an identity function", async () => {
    const password = "password";
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
  })

  test("should be verified with the same password", async () => {
    const password = "password";
    const hash = await hashPassword(password);
    expect(await verifyPassword({ password, hash })).toBeTruthy();
  })
})