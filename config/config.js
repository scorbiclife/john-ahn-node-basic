const config = require("#src/config/db.js");

module.exports = {
  dialect: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
};
