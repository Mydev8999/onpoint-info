const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'set_announce',
  description: 'Enregistre une annonce avec un nom spécifique pour ce serveur.',
  execute(message, args) {
    if (args.length < 2) {
      return message.reply('Usage : +set_announce <nom> <texte de l\'annonce>');
    }

    const name = args.shift().toLowerCase(); // nom de l'annonce
    const annonceText = args.join(' ');
    const filePath = path.resolve(__dirname, '../annonces.json');

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error('Erreur lecture annonces.json :', error);
    }

    // Si pas de données pour le serveur, on initialise un objet
    if (!data[message.guild.id]) data[message.guild.id] = {};

    // Enregistre ou remplace l'annonce par son nom
    data[message.guild.id][name] = annonceText;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    message.reply(`Annonce "${name}" enregistrée avec succès !`);
  }
};
