const { describe, test, expect } = require("@jest/globals");
const jwt = require("jsonwebtoken");
const { createToken, parseToken } = require("#src/auth/token.js");

describe("auth", () => {
  test("should be able to generate an access token", async () => {
    const data = { name: "example" };
    const token = await createToken(data, { expiresAfterSeconds: 600 });
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  test("should be able to verify a token", async () => {
    const data = { name: "example" };
    const token = await createToken(data, { expiresAfterSeconds: 600 });
    const parsedData = await parseToken(token);
    expect(parsedData).toMatchObject(data);
  });

  test("should reject a token if it's expired", async () => {
    const data = { name: "example" };
    // Review from Claude: set expiration time to the past instead of present to prevent flaky tests
    const token = await createToken(data, { expiresAfterSeconds: -600 });
    await expect(parseToken(token)).rejects.toThrow();
  });

  test("should reject a token that had changes in the payload", async () => {
    // Implemented by Claude Code and reviewed by @scorbiclife
    const data = { name: "example" };
    const token = await createToken(data, { expiresAfterSeconds: 600 });
    const parts = token.split(".");
    parts[1] = Buffer.from(JSON.stringify({ name: "tampered" })).toString(
      "base64url",
    );
    await expect(parseToken(parts.join("."))).rejects.toThrow();
  });

  test("should reject a token signed with a different secret", async () => {
    // Implemented by Claude Code and reviewed by @scorbiclife
    const token = jwt.sign({ name: "example" }, "wrong-secret", { expiresIn: "10m" });
    await expect(parseToken(token)).rejects.toThrow();
  });
});
