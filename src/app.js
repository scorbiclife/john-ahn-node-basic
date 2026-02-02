const express = require("express");
const { sequelize } = require("#root/models/index.js");

let app;

async function initApp() {
  if (app) {
    throw new Error("App already initialized");
  }
  app = express();
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

function getApp() {
  if (!app) {
    throw new Error("App not initialized");
  }
  return app;
}

async function destroyApp() {
  await sequelize.close();
}

module.exports = { initApp, getApp, destroyApp };
