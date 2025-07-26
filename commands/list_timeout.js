const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'list_timeout',
  description: 'Affiche la liste des membres en timeout ou déjà retirés.',
  execute(message) {
    const filePath = path.resolve(__dirname, '../timeouts.json');

    if (!fs.existsSync(filePath)) {
      return message.reply('Aucun timeout enregistré.');
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const list = data[message.guild.id];

    if (!list || list.length === 0) {
      return message.reply('Aucun membre en timeout.');
    }

    const embed = new EmbedBuilder()
      .setTitle('⏳ Liste des timeouts')
      .setColor('Orange');

    list.forEach(item => {
      let value;
      if (item.untimeout === true) {
        value = `Terminé : untimeout`;
      } else {
        value = `Expire le : <t:${Math.floor(item.until / 1000)}:R>`;
      }

      embed.addFields({
        name: item.tag,
        value: value,
        inline: false
      });
    });

    message.channel.send({ embeds: [embed] });
  }
};
