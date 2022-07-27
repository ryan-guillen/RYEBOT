const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
	async execute(interaction) {
		interaction.reply(`You are ${interaction.user}`)
	},
};
 //tip: you can access client with interaction.client