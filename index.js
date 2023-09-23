const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, GatewayVersion } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

var blockedWordsString = "Cunt,Wanker,Fuck,Fucker,Fack,fuck,fucker,fack,Facker,facker,cunt,wanker,Bitch,Beesh,B1tch,crap,WTF,fck,fkcer,motherfucker,motherfacker,motherfker,mf,beatch,b3atch,Faggot,fggt,fagot,fgt,fagt,fgot,Dickhead,dick,dickhed,dckhead,dckhd,dick,dck,dik,dic,dichead,dikhead,dchead,Dike,whore,slut,nigger,nigga,slvt,wh0re,123,shit,sh!t,nigger,n!gger,n!gg3r,nlgger,nlgg3r,n1gger,n1gg3r,niger,n1ger,nigga,n1gga,nigers,niggers,niggas,n1ggas,ni99as,ni9as,ni99a,ni9a,ni99er,ni9er,ni99ers,ni9ers,fuck,fvck,fuk,fvk,fukk,fukn,fukkn,fukken,bitch,b1tch,bltch,bicth,b1cth,dick,chit,ch1t,d1ck,dik,dic,d1c,ashole,azzhole,azz,nigar,niger,c0ck,cock,penis,vegina,vejina,vajina,muzerfucer,kock,koc,k0ck,f0k,fock,fok,foc,kys,wtf,fuck,cunt,cvnt,dickhead,asshole,arsehole,fuckhead,fag,fags,faggot,faggots,feggit,feggits,faggit,faggits,cunts,kkk,whore,whores,slut,sluts,cunt,cunts,dickhead,dickheads,fucktard,fucker,fuckerrs,fvckers,fckkers,whalecum,pussy,cock,dick,twat,hump,whitey,redneck,rednecks,chingchong,darky,darkey,darkie,darkies,darkys,darkeys,redskin,redskins,squinty,tacohead,anal,bastard,blowjob,boner,boob,boobs,boobies,boobeez,boobiez,boobz,tit,tits,titties,dildo,gay,queer,vagina,whore,cum,heil,sex,pissoff,bitch,fap,rape,raped";
const blockedWords = blockedWordsString.toString().split(',');

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
	if(message.author.bot) return;
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
	else if (blockedWords.some(blockedWord => message.content.toLowerCase().includes(blockedWord))) {
		const embed = new EmbedBuilder()
		.setTitle('Deleted Message')
		.setAuthor({name:'EthelMC Moderation'})
		.setDescription(`Deleted message from channel <#${message.channel.id}>`)
		.addFields(
			{name: '\u200B', value:`<@${message.author.id}> - ${message}`}
		)
		.setTimestamp()
		.setFooter({ text: 'EthelMC'});
		client.channels.cache.get(`1146605265580462151`).send({embeds: [embed]});
		message.channel.send(`<@${message.author.id}> Your previous message was deleted, as it contained blacklisted words. The message can be read by staff`)
		.then(msg => {
			setTimeout(() => msg.delete(), 10000)
		})
		.catch(err => console.log(err));
		message.delete();
	}
})

client.login(token);