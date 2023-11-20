const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, GatewayVersion, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { token } = require('./config.json');
const request = require('request');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

var blockedWordsArray = [];

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

function updateBlockedWords() {
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
}

updateBlockedWords();

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on('ready', () => {
	client.user.setActivity({
		type: ActivityType.Watching,
		name: 'EthelMC'
	});
})

client.on(Events.InteractionCreate, async interaction => {
	client.user.setActivity({
		type: ActivityType.Watching,
		name: 'EthelMC'
	});
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//MessageCreate Events to make grumbot reply to text messages
client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;

	// Text reply to "Hello Grumbot"
	else if (message.content.toLowerCase().includes('hello grumbot')) {
		await message.channel.send('Hi, I am Grumbot, the bot for the EthelMC Discord Server. I was created by <@373775406148616192>. I am still in development, so please be patient with me.');
	}

	else if (message.content.toLowerCase() === '!vote' || message.content.toLowerCase() === '!voting') {
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
			.setAuthor("EthelMC")
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
			.setFooter({texr: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240'});
		interaction.reply({
			embeds: [voteEmbed],
            components: [voteRow]
		});
	}
})

client.login(token);