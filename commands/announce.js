const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'announce',
  description: 'Envoie une annonce dans un salon mentionné.',
  async execute(message, args) {
    // Vérifie si l'utilisateur a la permission de gérer les messages
    if (!message.member.permissions.has('ManageMessages')) {
      return message.reply("Tu n'as pas la permission d'utiliser cette commande.");
    }

    // Récupère le premier salon mentionné
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Merci de mentionner un salon valide.');
    }

    // Supprime la mention du salon des arguments pour garder le message
    args.shift();

    const announcement = args.join(' ');
    if (!announcement) {
      return message.reply('Merci de préciser le texte de l\'annonce.');
    }

    const embed = new EmbedBuilder()
      .setTitle('Annonce')
      .setDescription(announcement)
      .setColor('Orange')
      .setTimestamp()
      .setFooter({ text: `Annonce de ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    try {
      await channel.send({ embeds: [embed] });
      message.reply(`Annonce envoyée dans ${channel}.`);
    } catch (error) {
      console.error(error);
      message.reply('Je ne peux pas envoyer de message dans ce salon.');
    }
  }
};
