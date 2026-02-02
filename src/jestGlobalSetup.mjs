import app from "#src/app.js";
import models from "#root/models/index.js";

export default async function globalSetup() {
  await app.initApp();
  await models.sequelize.sync({ force: true });
  await app.destroyApp();
}
