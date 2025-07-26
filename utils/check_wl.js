const fs = require("fs");
const path = require("path");

function isWhitelisted(guildId, userId) {
  const filePath = path.resolve(__dirname, "../whitelist.json");
  if (!fs.existsSync(filePath)) return false;

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const guildWhitelist = data[guildId]?.whitelist || [];
  return guildWhitelist.includes(userId);
}

module.exports = { isWhitelisted };
