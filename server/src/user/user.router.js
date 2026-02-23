const { Router } = require("express");
const models = require("#root/models/index.js");
const { UniqueConstraintError } = require("sequelize");
const {
  hashPassword,
  isValidPassword,
} = require("#src/user/password/index.js");
const {
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  ME_ROUTE,
} = require("#src/config/routes.js");
const { createToken } = require("#src/auth/token.js");
const { requireAuth } = require("#src/auth/middleware.js");
const {
  SESSION_TOKEN_DURATION_SECONDS,
  SESSION_COOKIE_KEY,
} = require("#src/config/password.js");

const userRouter = Router();
userRouter.post(SIGNUP_ROUTE, async (req, res) => {
  try {
    const passwordHash = await hashPassword(req.body.password);
    const userData = { ...req.body, password: passwordHash };
    const user = await models.User.create(userData);
    return res.status(201).json({});
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
    return res.status(401).json({});
  }
  if (!(await isValidPassword({ password, hash: foundUser.password }))) {
    return res.status(401).json({});
  }
  const token = await createToken(
    { email: foundUser.email },
    { expiresAfterSeconds: SESSION_TOKEN_DURATION_SECONDS },
  );
  await foundUser.update({ token });
  return res
    .status(200)
    .cookie(SESSION_COOKIE_KEY, token, {
      maxAge: SESSION_TOKEN_DURATION_SECONDS * 1000,
      secure: true,
      httpOnly: true,
    })
    .send();
});

userRouter.post(LOGOUT_ROUTE, requireAuth, async (req, res) => {
  await req.user.update({ token: null });
  return res.status(200).clearCookie(SESSION_COOKIE_KEY).send();
});

userRouter.get(ME_ROUTE, requireAuth, async (req, res) => {
  return res.status(200).json({ email: req.user.email });
});

module.exports.userRouter = userRouter;
