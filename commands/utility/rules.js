const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Displays server rules'),
    async execute(interaction) {
        await interaction.reply(`Rule 1. Be trustworthy, kind and honest\n\nRule 2. Do not break other builds, community builds, private builds, farms, structures\n\nRule 3. Be considered when taking communion resources, do not be greedy. ‘Take what you need not what you want\n\nRule 4. If you find a chest that shouldn’t be emptied out but is empty notify us!\n\nRule 5. No massive builds without permission, if you have an idea let us know!\n\nRule 6. Do not empty out community chests\n\nRule 7. it’s prohibited selling items from the community, if you are planning on opening a shop using community items everyone needs to agree.\n\nRule 8. Stealing is a big no-go.\n\nRule 9. Promoting illegal substances or activities is prohibited.\n\nRule 10. Do not claim insane amount of land near the town. We would like to keep expanding the town which is sadly something’s won’t be able to do if you do this`);
    }
}