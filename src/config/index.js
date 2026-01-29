const fs = require("fs");

const PORT = process.env.port ?? 3000;

const DB_PASSWORD = fs.readFileSync(process.env.DB_PASSWORD_FILE, "utf-8");
if (!DB_PASSWORD) {
  throw new Error("DB_PASSWORD not set up");
}

module.exports = {
  PORT,
  DB_PASSWORD,
};
