const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'timeout_clear',
  description: 'Supprime les timeouts terminés ou désactivés du fichier.',
  execute(message) {
    // Vérification des permissions
    if (!message.member.permissions.has('ModerateMembers')) {
      return message.reply("Tu n'as pas la permission d'utiliser cette commande.");
    }

    const filePath = path.resolve(__dirname, '../timeouts.json');
    if (!fs.existsSync(filePath)) {
      return message.reply('Aucun fichier timeouts.json trouvé.');
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const guildId = message.guild.id;

    if (!data[guildId] || data[guildId].length === 0) {
      return message.reply('Aucun timeout enregistré pour ce serveur.');
    }

    const now = Date.now();

    // Garde uniquement les timeouts actifs (dont la date d'expiration est dans le futur et pas untimeout)
    data[guildId] = data[guildId].filter(entry => {
      return entry.untimeout !== true && entry.until > now;
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    message.reply('Les timeouts terminés ou désactivés ont été supprimés du fichier.');
  }
};
