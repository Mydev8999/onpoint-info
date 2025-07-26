const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles.',
  execute(message, args, client) {
    const commands = client.commands;

    const embed = new EmbedBuilder()
      .setTitle('Liste des commandes')
      .setColor('Blue')
      .setDescription('Voici toutes les commandes disponibles :')
      .setTimestamp();

    // Ajout des commandes dans le embed
    commands.forEach(command => {
      embed.addFields({ name: `+${command.name}`, value: command.description || 'Pas de description', inline: false });
    });

    message.channel.send({ embeds: [embed] });
  }
};
