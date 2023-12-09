const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('colors')
		.setDescription('Display the Minecraft Color Codes'),
	async execute(interaction) {
		const colorEmbed = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('Minecraft Color Codes')
			.setDescription('Minecraft Color Codes')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.setImage("https://github.com/SarthakA24/GrumBot/blob/master/assets/color_codes.png?raw=true")
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL:"https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240" });
        await interaction.reply({ embeds: [colorEmbed] });
	},
};