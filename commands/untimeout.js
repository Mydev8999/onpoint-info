const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'untimeout',
  description: 'Retire un timeout d’un utilisateur et met à jour le JSON',
  async execute(message, args) {
    // Vérification des permissions
    if (!message.member.permissions.has('ModerateMembers')) {
      return message.reply("Tu n'as pas la permission d'utiliser cette commande.");
    }

    const filePath = path.resolve(__dirname, '../timeouts.json');
    if (!args[0]) return message.reply('Mentionne un utilisateur.');

    const member = message.mentions.members.first();
    if (!member) return message.reply('Utilisateur introuvable.');

    // Retire le timeout dans Discord
    try {
      await member.timeout(null, 'Timeout retiré manuellement'); 
    } catch (err) {
      console.error(err);
      return message.reply("Impossible de retirer le timeout.");
    }

    // Met à jour le JSON
    if (!fs.existsSync(filePath)) return message.reply("Pas de fichier timeouts.json.");
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!data[message.guild.id]) data[message.guild.id] = [];

    data[message.guild.id] = data[message.guild.id].map(entry => {
      if (entry.userId === member.id) {
        entry.untimeout = true; // Nouveau champ pour dire qu’il n’est plus en timeout
      }
      return entry;
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    message.reply(`${member.user.tag} n'est plus en timeout et le fichier JSON a été mis à jour.`);
  }
};
