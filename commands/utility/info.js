const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\n\n**WELCOME TO INFERNOBLES**\n\nWe are a server/team that care about each of our members and only want them to have the best Gaming experience. We are a community who think there should be a place safe and trusting for new players. You can ask all your questions and we will do our best to help you with them. We are completely based on and around trust. Be open and true with us and we will do our best to make sure you will not lack anything!\n\nPlease take a look around at our discord server to stay up-to-date with all the news and latest projects. We kindly ask you to read the <#1110829983720558602> and <#1110828863254175856> to keep the game fun and easier to understand. There also is an extra tab with team <#1110870580439289997>, we would appreciate it if you could fill that in so we know when and on what tasks we can count on you! Don't be shy suggesting idea's aswell! We love a challenge and love the creativity of all the suggestions in <#1117709805621084310>\n\n*Welcome Home*\n*Welcome to Infernobles*`);
    }
}