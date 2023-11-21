const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get the Server Status'),
    async execute(interaction) {
        try {
			var serverStatusEmbed = new EmbedBuilder();
			const response = await fetch("https://api.mcsrvstat.us/3/play.ethelmc.com");
            const serverInfomation = await response.json();
			if (serverInfomation.online) {
				serverStatusEmbed
					.setTitle(":green_circle: Online")
					.setDescription("Server is Online!!")
					.setColor("#00FF00")
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.addFields(
						{ name: "Players Online", value: `${serverInfomation.players.online}/${serverInfomation.players.max}` },
						{ name: "Server Version", value: '1.20.2' },
						{ name: "Server IP", value: 'play.ethelmc.com' },
						{ name: "Bedrock Port", value: '25565' }
					)
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
			} else {
				serverStatusEmbed
					.setTitle(":red_circle: Offline")
					.setDescription("Server is Offline! Check <#1135260823485431868> for information")
					.setColor("#FF0000")
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.addFields(
						{ name: "Server Version", value: '1.20.2' },
						{ name: "Server IP", value: 'play.ethelmc.com' },
						{ name: "Bedrock Port", value: '25565' }
					)
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
			}
			await interaction.reply({ embeds: [serverStatusEmbed] });
		} catch (e) {
			console.log(e);
		}
    },
};