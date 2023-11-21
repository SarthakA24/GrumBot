const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, GatewayVersion, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const prefix = "!";

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

var serverInfomation;
// Function to get server information
async function getServerInfo() {
	const response = await fetch("https://api.mcsrvstat.us/3/play.ethelmc.com");
	serverInfomation = await response.json();
}

//MessageCreate Events to make grumbot reply to text messages
client.on(Events.MessageCreate, async message => {

	const userMessage = message.content.slice(prefix.length).split(/ +/);
	const command = userMessage.shift().toLowerCase();

	// Disregard replies for messages that comes from a Bot
	if (message.author.bot) return;

	// Text reply to "Hello Grumbot"
	else if (message.content.toLowerCase().includes('hello grumbot')) {
		await message.channel.send('Hi, I am Grumbot, the bot for the EthelMC Discord Server. I was created by <@373775406148616192>. I am still in development, so please be patient with me.');
	}

	// Text reply to "!vote" or "!voting"
	else if (command === 'vote' || command === 'voting') {
		try {
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
			await message.reply({
				embeds: [voteEmbed],
				components: [voteRow]
			});
		} catch (e) {
			console.log(e);
			await message.reply("Error in sending vote links! Developers have been notified for this error");
			await client.channels.cache.get('1135141244171984946').send(`Error in '!vote' command in ${message.channel.name} with the following errors - ${e}`);
		}
	}

	// Text reply to "!online" or "!players" or "!playerlist" for getting list of online users
	else if (command === 'online' || command === 'players' || command === 'playerlist') {
		try {
			await getServerInfo();
			if (serverInfomation.online) {
				const onlineEmbed = new EmbedBuilder();
				onlineEmbed
					.setColor('#9b59b6')
					.setTitle('EthelMC Online Players')
					.setDescription('Current Players Online on EthelMC')
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
				const onlinePlayers = serverInfomation.players.list;
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
			await client.channels.cache.get('1135141244171984946').send(`Error in '${prefix}${command}' command in ${message.channel.name} with the following errors - ${e}`);
		}
	}

	// Text reply to !status for getting the server status
	else if (command === 'status') {
		try {
			var serverStatusEmbed = new EmbedBuilder();
			await getServerInfo();
			if (serverInfomation.online) {
				serverStatusEmbed
					.setTitle(":green_circle: Online")
					.setDescription("Server is Online!!")
					.setColor("#00FF00")
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.addFields(
						{ name: "Players Online", value: `${serverInfomation.players.online}/${serverInfomation.players.max}` },
						{ name: "Server Version", value: '1.20.2' },
						{ name: "Server IP", value: 'play.ethelmc.com' },
						{ name: "Bedrock Port", value: '25565' }
					)
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
			} else {
				serverStatusEmbed
					.setTitle(":red_circle: Offline")
					.setDescription("Server is Offline! Check <#1135260823485431868> for information")
					.setColor("#FF0000")
					.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
					.addFields(
						{ name: "Server Version", value: '1.20.2' },
						{ name: "Server IP", value: 'play.ethelmc.com' },
						{ name: "Bedrock Port", value: '25565' }
					)
					.setTimestamp()
					.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
			}
			await message.reply({ embeds: [serverStatusEmbed] });
		} catch (e) {
			console.log(e);
			await message.reply("Error in showing online users! Developers have been notified for this error");
			await client.channels.cache.get('1135141244171984946').send(`Error in '${prefix}${command}' command in ${message.channel.name} with the following errors - ${e}`);
		}
	}
})

client.login(token);