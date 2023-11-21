const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('online')
        .setDescription('Get Online Players in the Server'),
    async execute(interaction) {
        try {
			const response = await fetch("https://api.mcsrvstat.us/3/play.ethelmc.com");
			const data = await response.json();
			if (data.online) {
				const onlineEmbed = new EmbedBuilder();
				onlineEmbed
					.setColor('#9b59b6')
					.setTitle('EthelMC Online Players')
					.setDescription('Current Players Online on EthelMC')
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
				const onlinePlayers = data.players.list;
				if (onlinePlayers !== undefined) {
					const sortedOnlinePlayers = onlinePlayers.sort((a, b) => b.name - a.name);
					let onlinePlayersName = '';
					sortedOnlinePlayers.forEach(player => {
						onlinePlayersName += `${player.name}\n`;
					});
					onlineEmbed.addFields({ name: "Players List - ", value: `${onlinePlayersName}` });
				} else {
					onlineEmbed.addFields({ name: ':red_circle:', value: 'No Players Online', inline: true });
				}
				await message.reply({ embeds: [onlineEmbed] });
			} else {
				const offlineEmbed = new EmbedBuilder();
				offlineEmbed
					.setColor('#FF0000')
					.setTitle(':red_circle: Server is Offline!')
					.setDescription('Server is Offline! Check <#1135260823485431868> for information')
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.addFields(
						{ name: 'Server is Offline', value: "\u200B" }
					)
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
				await message.reply({ embeds: [offlineEmbed] });
			}
		} catch (e) {
			console.log(e);
			await message.reply("Error in showing online users! Developers have been notified for this error");
			await client.channels.cache.get('1135141244171984946').send(`Error in '/online' command in ${message.channel.name} with the following errors - ${e}`);
		}
    },
};