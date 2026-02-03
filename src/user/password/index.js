const bcrypt = require("bcrypt");
const passwordConfig = require("#src/config/password.js");

async function hashPassword(password) {
  return await bcrypt.hash(password, passwordConfig.BCRYPT_PASSWORD_COST);
}
module.exports.hashPassword = hashPassword;

async function verifyPassword({ password, hash }) {
  return await bcrypt.compare(password, hash);
}
module.exports.verifyPassword = verifyPassword;

async function isValidPassword({ password, hash }) {
  return await verifyPassword({ password, hash });
}
module.exports.isValidPassword = isValidPassword;
