const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks if GrumBot is Online or not!'),
	async execute(interaction) {
		await interaction.reply('Beep Boop Beep Beep! Hi, I am GrumBot!');
	},
};