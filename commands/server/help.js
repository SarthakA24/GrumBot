const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Display help options for the server'),
	async execute(interaction) {
		await interaction.reply(`Hi <@${interaction.user.id}>, Grumbot here! If you have any querie/questions/issues related to the Minecraft Server or the Discord Server, you can ask in <#1145330050456096810> or create a ticket at <#1142483755026616350> and one of our staff member will reply as soon as possible! *[Don't forget to vote MUMBO FOR MAYOR]*`);
	},
};