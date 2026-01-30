const { Sequelize } = require("sequelize");
const config = require("#src/config/db.js");

async function createConnection() {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
  });

  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }

  return sequelize;
}

module.exports = { createConnection };
