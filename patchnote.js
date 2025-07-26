const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const { getCommandNames } = require('./utils/commandUtils'); // Chemin selon où tu as mis cette fonction

async function checkNewCommands(client, guildId, channelId) {
  const currentCommands = getCommandNames();
  const backupPath = path.resolve(__dirname, './commands_backup.json');

  let oldCommands = [];
  if (fs.existsSync(backupPath)) {
    oldCommands = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  }

  // Trouve les commandes qui sont dans currentCommands mais pas dans oldCommands
  const newCommands = currentCommands.filter(cmd => !oldCommands.includes(cmd));

  if (newCommands.length === 0) return; // Rien de nouveau

  const guild = await client.guilds.fetch(guildId);
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return console.error('Salon introuvable');

  const embed = new EmbedBuilder()
    .setTitle('🚀 Nouvelles commandes ajoutées')
    .setColor('Green')
    .setDescription(newCommands.map(cmd => `• ${cmd}`).join('\n'))
    .setTimestamp();

  await channel.send({ embeds: [embed] });

  // Met à jour le backup
  fs.writeFileSync(backupPath, JSON.stringify(currentCommands, null, 2));
}

module.exports = { checkNewCommands };
