const { createConnection } = require("#src/db/connection.js");

let globalConnection;

async function initGlobalConnection() {
  if (globalConnection) {
    throw new Error("Global connection already initialized!");
  }
  globalConnection = await createConnection();
}

/**
 * Getter function for global connection.
 * Implemented as a getter to prevent stale values from being imported.
 */
function getGlobalConnection() {
  if (!globalConnection) {
    throw new Error("Global connection not yet initialized!");
  }
  return globalConnection;
}

async function closeGlobalConnection() {
  await globalConnection.close();
}

module.exports = {
  initGlobalConnection,
  getGlobalConnection,
  // Exported for jest tests to close the connection early and explicitly
  closeGlobalConnection,
};
