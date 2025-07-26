module.exports = {
    name: 'exclude',
    description: 'Kick un utilisateur (alias). Usage : +exclude @user',
    async execute(message, args) {
      if (!message.member.permissions.has('KickMembers')) {
        return message.reply('❌ Tu n’as pas la permission de kick.');
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Usage : +exclude @user');
      }
  
      try {
        await member.kick(`Kick par ${message.author.tag}`);
        message.reply(`✅ ${member.user.tag} a été exclu (kick).`);
      } catch (err) {
        console.error(err);
        message.reply('❌ Impossible d’exclure cet utilisateur.');
      }
    }
  };
  