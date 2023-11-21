const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('EthelMC Server Voting Links'),
    async execute(interaction) {
        const voteLink1 = new ButtonBuilder()
            .setLabel('Vote Link 1')
            .setURL('https://mcservers.top/server/2471')
            .setStyle(ButtonStyle.Link);
        const voteLink2 = new ButtonBuilder()
            .setLabel('Vote Link 2')
            .setURL('https://topg.org/minecraft-servers/server-657465')
            .setStyle(ButtonStyle.Link);
        const voteLink3 = new ButtonBuilder()
            .setLabel('Vote Link 3')
            .setURL('https://minecraft-server-list.com/server/499666/')
            .setStyle(ButtonStyle.Link);
        const voteLink4 = new ButtonBuilder()
            .setLabel('Vote Link 4')
            .setURL('https://minecraft-mp.com/server-s324551')
            .setStyle(ButtonStyle.Link);
        const voteLink5 = new ButtonBuilder()
            .setLabel('Vote Link 5')
            .setURL('https://minecraftservers.org/server/655537')
            .setStyle(ButtonStyle.Link);
        const voteRow = new ActionRowBuilder()
            .addComponents(voteLink1, voteLink2, voteLink3, voteLink4, voteLink5);
        const voteEmbed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('EthelMC Voting')
            .setDescription('Vote for EthelMC and win amazing in-game rewards!')
            .setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
            .addFields(
                { name: 'Vote Link 1', value: '[MC Servers Top](https://mcservers.top/server/2471)' },
                { name: 'Vote Link 2', value: '[TopG](https://topg.org/minecraft-servers/server-657465)' },
                { name: 'Vote Link 3', value: '[Minecraft Servers List](https://minecraft-server-list.com/server/499666/)' },
                { name: 'Vote Link 4', value: '[Minecraft MP](https://minecraft-mp.com/server-s324551)' },
                { name: 'Vote Link 5', value: '[Minecraft Servers](https://minecraftservers.org/server/655537)' }
            )
            .setTimestamp()
            .setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
        await interaction.reply({
            embeds: [voteEmbed],
            components: [voteRow]
        });
    },
};