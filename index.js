const { initApp } = require("#src/app.js");
const { PORT } = require("#root/config.js");

const app = initApp();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on("exit", destroyApp);
