const { Router } = require("express");
const models = require("#root/models/index.js");
const { UniqueConstraintError } = require("sequelize");

const signupRouter = Router();
module.exports.signupRouter = signupRouter;

signupRouter.post("/", async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).end();
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: "duplicate email" });
    }
    throw new Error("signup failure", { cause: error });
  }
});
