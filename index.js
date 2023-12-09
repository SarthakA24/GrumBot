const dotNet = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, GatewayVersion, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, WebhookClient } = require('discord.js');
const { channel } = require('node:diagnostics_channel');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

//Load .env variables
dotNet.config();

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

	// Text replies to only Sar
	//  || message.author.id === '654969698471116800'
	if (message.author.id === '373775406148616192') {
		if (message.content.toLowerCase().includes(':fatty:')) {
			message.delete();
			message.channel.createWebhook({
				name: "Sar",
				avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
			}).then(webhook => {
				const webhookClient = new WebhookClient({ id: webhook.id, token: webhook.token })
				webhookClient.send({
					content: message.content.replace(":fatty:", '<a:fatty:1149363358580084746>'),
					username: "Sar",
					avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
				}).catch(async err => {
					console.error(err);
					await client.channels.cache.get('1135141244171984946').send(`Error in replacing emotes in ${message.channel.name} with the following errors - ${err}`);
				})
				webhookClient.delete(webhook.id);
			});
		}

		// Send message via webhook for each message containing the words - "?webhook"
		else if (message.content.toLowerCase().startsWith('?webhook') &&  !message.content.toLowerCase().includes(':fatty:')) {
			message.delete();
			message.channel.createWebhook({
				name: message.author.username,
				avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
			}).then(webhook => {
				const webhookClient = new WebhookClient({ id: webhook.id, token: webhook.token })
				webhookClient.send({
					content: message.content.replace("?webhook", " "),
					username: message.author.username,
					avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
				}).catch(async err => {
					console.log(webhook);
					console.error(err);
					await client.channels.cache.get('1135141244171984946').send(`Error in replacing emotes in ${message.channel.name} with the following errors - ${err}`);
				})
				webhookClient.delete(webhook.id);
			});
		}
	}

	// Text reply to "Hello Grumbot"
	if (message.content.toLowerCase().includes('hello grumbot')) {
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
				content: `Hi there <@${message.author.id}>! Here are the voting links for the EthelMC Server`,
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
					onlineEmbed.addFields({ name: ' ', value: 'No Players Online', inline: true });
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

	// Text reply for !help
	else if (command === 'help') {
		await message.reply(`Hi <@${message.author.id}>, Grumbot here! If you have any querie/questions/issues related to the Minecraft Server or the Discord Server, you can ask in <#1145330050456096810> or create a ticket at <#1142483755026616350> and one of our staff member will reply as soon as possible! *[Don't forget to vote MUMBO FOR MAYOR]*`);
	}

	// Text reply for !invite
	else if (command === 'invite') {
		let inviteLink;
		await client.channels.cache.get('1135141244171984946').createInvite({
			maxAge: 86400
		}).then(invite => { inviteLink = invite.url });
		await message.reply(`Hi <@${message.author.id}>, Grumbot here! I see that you have requested an invite link for this discord server. Generating an Invite Link, please wait for a moment.`).then(sentMessage => {
			setTimeout(() => {
				sentMessage.edit(`Hi <@${message.author.id}>, Grumbot here! I see that you have requested an invite link for this discord server. Link Generated...... Sending the link .....`);
				setTimeout(() => {
					sentMessage.edit(`Hi <@${message.author.id}>, Grumbot here! I see that you have requested an invite link for this discord server. Here is your requested invite link - ${inviteLink}\n\n**Note - This link will be valid till 24 hours from now. Please request a new invite link after that.**`);
				}, 2000);
			}, 4000);
		});
	}

	// Text reply to !ip
	else if (command === "ip") {
		const serverIP = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('EthelMC Server IP')
			.setDescription('Server IP for EthelMC')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.addFields(
				{ name: 'Java IP', value: 'play.ethelmc.com' },
				{ name: 'Bedrock IP', value: 'play.ethelmc.com' },
				{ name: 'Bedrock Port', value: '25565' }
			)
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
		await message.reply({content:`Hi there <@${message.author.id}! Here is the IP for the EthelMC Server`, embeds: [serverIP]});
	}

	// Text reply to !store or !shop
	else if (command === "store" || command === "shop") {
		const storeEmbed = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('EthelMC Store')
			.setDescription('Store for EthelMC')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.addFields(
				{ name: 'Store Link', value: 'https://store.ethelmc.com/' }
			)
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL: 'https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240' });
		await message.reply({content: `Hi there <@${message.author.id}>! Here is the link to the EthelMC Store`, embeds: [storeEmbed]})
	}

	// Text reply to !avatar to show the mentioned user avatar with a download button
	else if (command === "avatar" || command === "av") {
		const user = message.mentions.users.first() || message.author;
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
			.setFooter({ text: 'EthelMC' });
		await message.reply({ 
			embeds: [avatarEmbed], 
			components: [actionRow] });
	}

	// Text reply to !colors or !codes for Minecraft Color Codes
	else if (command === "colors" || command === "codes") {
		const colorEmbed = new EmbedBuilder()
			.setColor('#9b59b6')
			.setTitle('Minecraft Color Codes')
			.setDescription('Minecraft Color Codes')
			.setThumbnail('https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240')
			.setImage("./assets/color_codes.png")
			.setTimestamp()
			.setFooter({ text: 'EthelMC', iconURL:"https://cdn.discordapp.com/icons/1133675387830947850/51e577f9fbdca17213304e9a60bed0d3.webp?size=240" });
		await message.reply({ embeds: [colorEmbed] });
	}

})

client.login(process.env.BOT_TOKEN);