const {dev_id} = require('../config.json');
module.exports = {
    name: 'reload',
    description: 'Recharge une commande.',
    async execute(message, args, client) {
      // Vérifie que l'utilisateur est autorisé (ici : l'owner)
      const ownerId = dev_id; // remplace par ton ID Discord
      if (message.author.id !== ownerId) {
        return message.reply('Tu n\'as pas la permission pour faire ça.');
      }
  
      const commandName = args[0];
      if (!commandName) {
        return message.reply('Merci de préciser la commande à recharger.');
      }
  
      const commandPath = `./${commandName}.js`;
  
      try {
        // Supprime la commande du cache
        delete require.cache[require.resolve(`./${commandName}.js`)];
  
        // Recharge la commande
        const newCommand = require(`./${commandName}.js`);
  
        // Met à jour dans la collection
        client.commands.set(newCommand.name, newCommand);
  
        message.reply(`Commande \`${commandName}\` rechargée avec succès !`);
      } catch (error) {
        console.error(error);
        message.reply(`Erreur lors du rechargement de la commande \`${commandName}\`.`);
      }
    }
  };
  