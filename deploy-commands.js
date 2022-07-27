const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require("dotenv");
dotenv.config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, '176473336727994368'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

await rest.put(Routes.applicationCommands(process.env.CLIENTID),{ body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);