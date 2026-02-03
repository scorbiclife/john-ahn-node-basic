const { Router } = require("express");
const models = require("#root/models/index.js");
const { UniqueConstraintError } = require("sequelize");
const { hashPassword } = require("#src/user/password/index.js");

const signupRouter = Router();
module.exports.signupRouter = signupRouter;

signupRouter.post("/", async (req, res) => {
  try {
    const passwordHash = await hashPassword(req.body.password);
    const userData = { ...req.body, password: passwordHash };
    const user = await models.User.create(userData);
    return res.status(201).end();
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: "duplicate email" });
    }
    throw new Error("signup failure", { cause: error });
  }
});
