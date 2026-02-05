const models = require("#root/models/index.js");
const { parseToken } = require("#src/auth/token.js");
const { SESSION_COOKIE_KEY } = require("#src/config/password.js");

async function requireAuth(req, res, next) {
  const token = req.cookies[SESSION_COOKIE_KEY];
  if (!token) {
    return res.status(401).end();
  }
  try {
    const { email } = await parseToken(token);
    const user = await models.User.findOne({ where: { email } });
    if (!user || user.token !== token) {
      return res.status(401).end();
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).end();
  }
}

module.exports = { requireAuth };
