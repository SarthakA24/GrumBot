const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, GatewayVersion, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

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
	// // Text reply to "idea" same as /idea
	// else if (message.content.toLowerCase().includes('idea')) {
	// 	const randomBoolean = () => Math.random() >= 0.5
	//     if (randomBoolean()) {
	// 	await message.channel.send('GrumBot Agrees with this Idea!');
	//     } else {
	//         await message.channel.send('GrumBot Disagrees');
	//     }
	// }
	// Text reply to "Hello Grumbot"
	else if (message.content.toLowerCase().includes('hello grumbot')) {
		await message.channel.send('Hi, I am Grumbot, the bot for the EthelMC Discord Server. I was created by <@373775406148616192>. I am still in development, so please be patient with me.');
	}
	// Deletes messages containing blacklisted words
	else if (blockedWordsArray.some(blockedWord => message.content.toLowerCase().includes(blockedWord))) {
		updateBlockedWords();
		const embed = new EmbedBuilder()
			.setTitle('Deleted Message')
			.setAuthor({ name: 'EthelMC Moderation' })
			.setDescription(`Deleted message from channel <#${message.channel.id}>`)
			.addFields(
				{ name: '\u200B', value: `<@${message.author.id}> - ${message}` }
			)
			.setTimestamp()
			.setFooter({ text: 'EthelMC' });
		client.channels.cache.get(`1133676891908341832`).send({ embeds: [embed] });
		message.channel.send(`<@${message.author.id}> Your previous message was deleted, as it contained blacklisted words. The message can be read by staff`)
			.then(msg => {
				setTimeout(() => msg.delete(), 5000)
			})
			.catch(err => console.log(err));
		message.delete();
	}
})

client.login(token);