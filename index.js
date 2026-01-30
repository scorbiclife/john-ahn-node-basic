const { initApp, destroyApp } = require("#src/app.js");
const { APP_PORT } = require("#src/config/index.js");

async function main() {
  const app = await initApp();

  app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
}

main();
process.on("exit", destroyApp);
