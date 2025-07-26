const {isWhitelisted} = require('../utils/check_wl.js');

module.exports = {
    name: 'ban',
    description: 'Bannit un utilisateur. Usage : +ban @user [raison]',
    async execute(message, args) {
      if (!message.member.permissions.has('BanMembers')) {
        return message.reply('❌ Tu n’as pas la permission de bannir.');
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Usage : +ban @user');
      }
  
      try {
        await member.ban({ reason: `Ban par ${message.author.tag}` });
        message.reply(`✅ ${member.user.tag} a été banni.`);
      } catch (err) {
        console.error(err);
        message.reply('❌ Impossible de bannir cet utilisateur.');
      }
    }
  };
  