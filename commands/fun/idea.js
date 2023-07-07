const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('idea')
		.setDescription('Checks if GrumBot Agrees or Disagree with the idea'),
	async execute(interaction) {
        const randomBoolean = () => Math.random() >= 0.5
        if (randomBoolean()) {
		await interaction.reply('GrumBot Agrees with this Idea!');
        } else {
            await interaction.reply('GrumBot Disagrees');
        }
	},
};