const { initApp, destroyApp } = require("#src/app.js");
const { APP_PORT } = require("#root/src/config/app.js");

async function main() {
  const app = await initApp();

  app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
}

main();
process.on("exit", destroyApp);
