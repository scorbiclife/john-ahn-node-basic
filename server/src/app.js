const express = require("express");
const { sequelize } = require("#root/models/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { userRouter } = require("#root/src/user/user.router.js");

let app;

async function initApp() {
  if (app) {
    throw new Error("App already initialized");
  }
  app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/", userRouter);

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
