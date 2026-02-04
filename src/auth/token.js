const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("#src/config/password.js");

async function createToken(data, { expiresAfterSeconds }) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: expiresAfterSeconds });
}

async function parseToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { createToken, parseToken };
