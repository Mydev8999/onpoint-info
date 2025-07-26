const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] });

client.commands = new Discord.Collection();

// Charger toutes les commandes du dossier commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Bot prêt !');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    const command = client.commands.get(commandName);
  
    if (!command) {
      return message.channel.send(`Commande inconnue : \`${commandName}\``);
    }
  
    try {
      command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply('Une erreur est survenue lors de l\'exécution de la commande.');
    }
  });
  

// Remplace 'YOUR_BOT_TOKEN' par ton token Discord
client.login(token);
