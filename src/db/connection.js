const { Sequelize } = require("sequelize");
const { DB_PASSWORD } = require("#src/config/index.js");

async function createConnection() {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: DB_PASSWORD,
  });

  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }

  return sequelize;
}

module.exports = { createConnection };
