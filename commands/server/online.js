const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
                await interaction.reply({ embeds: [onlineEmbed] });
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
                await interaction.reply({ embeds: [offlineEmbed] });
            }
        } catch (e) {
            console.log(e);
        }
    },
};