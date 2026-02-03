const { Router } = require("express");
const models = require("#root/models/index.js");
const { UniqueConstraintError } = require("sequelize");
const {
  hashPassword,
  isValidPassword,
} = require("#src/user/password/index.js");
const { SIGNUP_ROUTE, LOGIN_ROUTE } = require("#src/config/routes.js");

const userRouter = Router();
userRouter.post(SIGNUP_ROUTE, async (req, res) => {
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

userRouter.post(LOGIN_ROUTE, async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await models.User.findOne({ where: { email } });
  if (!foundUser) {
    return res.status(401).end();
  }
  if (!isValidPassword({ password, hash: foundUser.password })) {
    return res.status(401).end();
  }
  return res.status(200).end();
});

module.exports.userRouter = userRouter;
