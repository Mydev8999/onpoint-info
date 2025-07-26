const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'list_announce',
  description: 'Liste toutes les annonces enregistrées pour ce serveur. Usage : +list_announce',
  execute(message) {
    const filePath = path.resolve(__dirname, '../annonces.json');

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error('Erreur lecture annonces.json :', error);
      return message.reply('Erreur lors de la lecture des annonces.');
    }

    const serverAnnonces = data[message.guild.id];

    if (!serverAnnonces || Object.keys(serverAnnonces).length === 0) {
      return message.reply('Aucune annonce enregistrée pour ce serveur.');
    }

    // Créer un embed
    const embed = new EmbedBuilder()
      .setTitle('📢 Annonces enregistrées')
      .setColor('Blue')
      .setTimestamp();

    // Ajouter chaque annonce
    Object.keys(serverAnnonces).forEach((name) => {
      embed.addFields({
        name: name,
        value: serverAnnonces[name].slice(0, 50) + (serverAnnonces[name].length > 50 ? '...' : ''), // on tronque pour éviter les embeds trop longs
        inline: false
      });
    });

    message.channel.send({ embeds: [embed] });
  }
};
