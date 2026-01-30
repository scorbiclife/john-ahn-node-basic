const fs = require("fs");
const { getFromEnvOrThrow } = require("#root/src/config/env.js");

const APP_PORT = getFromEnvOrThrow("APP_PORT");

module.exports = {
  APP_PORT,
};
