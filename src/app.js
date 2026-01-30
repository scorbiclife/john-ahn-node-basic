const express = require("express");
const {
  initGlobalConnection,
  closeGlobalConnection,
} = require("./db/globalConnection.js");

async function initApp() {
  await initGlobalConnection();

  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  return app;
}

async function destroyApp() {
  await closeGlobalConnection();
}

module.exports = { initApp, destroyApp };
