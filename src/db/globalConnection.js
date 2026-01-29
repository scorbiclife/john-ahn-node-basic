const globalConnection = createConnection();
process.on("exit", async () => {
  await globalConnection.close();
});

module.exports = { globalConnection };
