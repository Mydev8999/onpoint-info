const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'announce_saved',
  description: 'Envoie une annonce enregistrée dans un salon mentionné.',
  execute(message, args) {
    if (args.length < 2) {
      return message.reply('Usage : +announce_saved <nom> #salon');
    }

    const name = args.shift().toLowerCase();
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('Merci de mentionner un salon.');

    const filePath = path.resolve(__dirname, '../annonces.json');

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error('Erreur lecture annonces.json :', error);
      return message.reply('Erreur lors de la lecture des annonces.');
    }

    const serverAnnonces = data[message.guild.id];
    if (!serverAnnonces) return message.reply('Aucune annonce enregistrée pour ce serveur.');

    const annonceText = serverAnnonces[name];
    if (!annonceText) return message.reply(`Aucune annonce nommée "${name}" trouvée.`);

    const embed = new EmbedBuilder()
      .setTitle(`Annonce : ${name}`)
      .setDescription(annonceText)
      .setColor('Orange')
      .setTimestamp()
      .setFooter({ text: `Annonce du serveur ${message.guild.name}` });

    channel.send({ embeds: [embed] });
    message.reply(`Annonce "${name}" envoyée dans ${channel}.`);
  }
};
