module.exports.getFromEnvOrThrow = getFromEnvOrThrow;
function getFromEnvOrThrow(varName) {
  const result = process.env[varName];
  if (!result) {
    throw new Error(`env var with name "${varName}" not set`);
  }
  return result;
}

module.exports.getFromEnvOrDefault = getFromEnvOrDefault;
function getFromEnvOrDefault(varName, defaultValue) {
  try {
    return getFromEnvOrThrow(varName);
  } catch {
    return defaultValue;
  }
}
