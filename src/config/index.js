const fs = require("fs");

function getFromEnvOrThrow(varName) {
  const result = process.env[varName];
  if (!result) {
    throw new Error(`env var with name "${varName}" not set`);
  }
  return result;
}

function getFromEnvOrDefault(varName, defaultValue) {
  try {
    return getFromEnvOrThrow(varName);
  } catch {
    return defaultValue;
  }
}

const APP_PORT = getFromEnvOrThrow("APP_PORT");

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
  getFromEnvOrDefault,
  APP_PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
};
