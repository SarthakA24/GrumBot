const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Display the server IP'),
	async execute(interaction) {
        const serverIP = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('EthelMC Server IP')
			.setDescription('Server IP for EthelMC')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.addFields(
				{ name: 'Java IP', value: 'play.ethelmc.com' },
				{ name: 'Bedrock IP', value: 'play.ethelmc.com' },
				{ name: 'Bedrock Port', value: '25565' }
			)
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
        await interaction.reply({ embeds: [serverIP] });
    }
}