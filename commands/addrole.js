const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'addrole',
  description: 'Ajoute un rôle à un membre. Usage: !addrole @membre @role',
  async execute(message, args) {
    // Vérifie si l'utilisateur qui lance la commande a les permissions
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply("Tu n'as pas la permission d'ajouter des rôles.");
    }

    // Récupère le membre mentionné
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Mentionne un membre valide.");
    }

    // Récupère le rôle mentionné
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply("Mentionne un rôle valide.");
    }

    // Vérifie la hiérarchie des rôles
    if (message.guild.members.me.roles.highest.position <= role.position) {
      return message.reply("Je ne peux pas ajouter ce rôle (il est au-dessus de mon rôle le plus haut).");
    }

    try {
      await member.roles.add(role);
      message.reply(`✅ Le rôle **${role.name}** a été ajouté à ${member.user.tag}.`);
    } catch (error) {
      console.error(error);
      message.reply("Impossible d'ajouter ce rôle.");
    }
  }
};
