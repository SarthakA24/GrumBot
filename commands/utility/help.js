const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help options for Grumbot'),
    async execute(interaction) {
        await interaction.reply(`Hi, I am Grumbot, the bot for the Infernobles Discord Server.\n\nI have the following commands to play around - \n\n1. **/idea** - I read, and analyse the said idea, and comeup with a decision whether the idea is good or not.\n2. **/ping** - Checks if I am online or not.\n3. **/info** - Shows information about Infernobles Discord Server.\n4. **/rules** - Shows rules of Infernobles Discord Server.\n5. **/help** - Shows this message.\n6. **/prune <amount in number>** - Deletes the specified number of messages. **(ADMINS ONLY)**\n7. **/support** - Shows the support options for the Infernobles Discord Server\n\n**NOTE** - I am still in development, so please be patient with me. :face_with_peeking_eye:`);
    }
}