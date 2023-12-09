const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows the full size avatar of a user')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('The user to show the avatar of')),
	async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const downloadAvatar = new ButtonBuilder()
			.setLabel('Download Avatar')
			.setURL(user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setStyle(ButtonStyle.Link);
		const actionRow = new ActionRowBuilder()
			.addComponents(downloadAvatar);
        const avatarEmbed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
            .setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
        await interaction.reply({ 
            embeds: [avatarEmbed],
            components: [actionRow]
        })
	},
};