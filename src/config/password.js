const fs = require("fs");
const { getFromEnvOrThrow } = require("./env.js");

const BCRYPT_PASSWORD_COST = parseInt(
  getFromEnvOrThrow("BCRYPT_PASSWORD_COST"),
  10,
);
module.exports.BCRYPT_PASSWORD_COST = BCRYPT_PASSWORD_COST;

const JWT_SECRET_FILE = getFromEnvOrThrow("JWT_SECRET_FILE");
const JWT_SECRET = fs.readFileSync(JWT_SECRET_FILE, "utf-8");
module.exports.JWT_SECRET = JWT_SECRET;
