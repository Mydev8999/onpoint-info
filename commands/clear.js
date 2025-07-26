const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Supprime un nombre défini de messages. Usage: !clear <nombre>',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("Tu n'as pas la permission de supprimer des messages.");
    }

    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("Je n'ai pas la permission de supprimer des messages.");
    }

    const amount = parseInt(args[0], 10);

    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply("Spécifie un nombre valide entre 1 et 100.");
    }

    try {
      // On supprime la commande elle-même pour ne pas la laisser dans le salon
      await message.delete();

      // On supprime les messages
      const deletedMessages = await message.channel.bulkDelete(amount, true);

      // Puis on envoie un message de confirmation
      const confirmation = await message.channel.send(`✅ ${deletedMessages.size} messages ont été supprimés.`);

      // Et on le supprime après 2 secondes
      setTimeout(() => confirmation.delete().catch(() => {}), 2000);

    } catch (error) {
      console.error(error);
      message.reply("Impossible de supprimer les messages (ils doivent dater de moins de 14 jours).");
    }
  }
};
