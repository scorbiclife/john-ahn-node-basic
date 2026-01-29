const app = require("#src/app.js");
const { PORT } = require("#root/config.js");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
