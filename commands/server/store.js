const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('store')
		.setDescription('Display the server store link'),
	async execute(interaction) {
        const storeEmbed = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('EthelMC Store')
			.setDescription('Store for EthelMC')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.addFields(
				{ name: 'Store Link', value: 'https://store.ethelmc.com/' }
			)
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
        await interaction.reply({content: `Hi there <@${interaction.user.id}>! Here is the link to the EthelMC Store`, embeds: [storeEmbed]})
    }
}