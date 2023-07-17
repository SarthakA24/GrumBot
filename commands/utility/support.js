const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Show support options for Infernobles'),
    async execute(interaction) {
        await interaction.reply(`Hi ${interaction.member.user.username}. If you need any help for any help with in-game issues or discord issues, please make a ticket in <#1112675898483822692>.\nIf you need any technical support related to the game or your PC/Laptop/Any Device, you can ask in <#1123495447516942347>, and someon will come up to help you.\nYou can DM either <@373775406148616192> or <@297829357823459329>, they will be happy to help you with any issues you might have.`);
    }
}