const { SlashCommandBuilder } = require('discord.js');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads my config files'),
    async execute(interaction) {
        // if interaction is sent by Owner
        if (interaction.member.roles.cache.some(role => role.name === 'Owner')) {
            var blockedWordsArray = [];
            const URL = 'https://raw.githubusercontent.com/SarthakA24/Grumbot_Blocked_Words/master/blocked_words.txt';
            const TOKEN = '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';
            var options = {
                url: URL,
                headers: {
                    'Authorization': 'token ' + TOKEN
                }
            };
            function callback(error, response, body) {
                blockedWordsArray = body.split(',');
            }
            request(options, callback);
            module.exports = {blockedWordsArray};
            await interaction.reply("Config Reloaded");
        } else {
            await interaction.reply('You are not allowed to use this command!');
        }
    },
};