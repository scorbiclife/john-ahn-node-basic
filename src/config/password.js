const { getFromEnvOrThrow } = require("./env.js");

const BCRYPT_PASSWORD_COST = parseInt(getFromEnvOrThrow("BCRYPT_PASSWORD_COST"), 10);
module.exports.BCRYPT_PASSWORD_COST = BCRYPT_PASSWORD_COST;