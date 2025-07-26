const {EmbedBuilder} = require('discord.js');
const config = require('../config.json');
module.exports = {
    name: 'test',
    description: 'Renvoie le ping du bot. Usage : +test',
    execute(message) {

    if (message.author.id !== config.dev_id ){
      const ping = Date.now() - message.createdTimestamp;
        const embed = new EmbedBuilder()
        .setTitle('Ping')
        .setDescription(`Latence : ${ping}ms`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: 'OnPoint studio dev commands', iconURL: 'https://cdn.discordapp.com/app-icons/1398478604098338907/f323f21b16afc736a25806c0f56e3008.png' });
     
        message.channel.send({ embeds: [embed] });
    }
}
  
};
  