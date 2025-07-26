const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'timeout',
  description: 'Timeout un utilisateur pour un certain temps (en secondes). Usage : +timeout @user <durée en secondes> warning: cette commande est iréversible et ne peut pas être annulée.',
  async execute(message, args) {
    if (!message.member.permissions.has('ModerateMembers')) {
      return message.reply('❌ Tu n’as pas la permission de timeout.');
    }

    const member = message.mentions.members.first();
    const duration = parseInt(args[1], 10) * 1000; // secondes → ms

    if (!member || isNaN(duration)) {
      return message.reply('Usage : +timeout @user <durée en secondes>');
    }

    try {
      await member.timeout(duration, `Timeout par ${message.author.tag}`);

      // --- Sauvegarde dans timeouts.json ---
      const filePath = path.resolve(__dirname, '../timeouts.json');
      let data = {};

      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      if (!data[message.guild.id]) data[message.guild.id] = [];

      data[message.guild.id].push({
        userId: member.id,
        tag: member.user.tag,
        until: Date.now() + duration
      });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      message.reply(`✅ ${member.user.tag} a été timeout pour ${args[1]} secondes.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Impossible de timeout cet utilisateur.');
    }
  }
};
