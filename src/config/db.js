const fs = require("fs");
const { getFromEnvOrThrow } = require("#root/src/config/env.js");

const DB_HOST = getFromEnvOrThrow("DB_HOST");
const DB_PORT = getFromEnvOrThrow("DB_PORT");
const DB_DATABASE = getFromEnvOrThrow("DB_DATABASE");
const DB_USERNAME = getFromEnvOrThrow("DB_USERNAME");
const DB_PASSWORD_FILE = getFromEnvOrThrow("DB_PASSWORD_FILE");
const DB_PASSWORD = fs.readFileSync(DB_PASSWORD_FILE, "utf-8");
if (!DB_PASSWORD) {
  throw new Error("DB_PASSWORD not set up");
}

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
};
