const { Router } = require("express");
const models = require("#root/models/index.js");

const signupRouter = Router();
module.exports.signupRouter = signupRouter;

signupRouter.post("/", async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).end();
  } catch (error) {
    throw new Error("signup failure", { cause: error });
  }
});
