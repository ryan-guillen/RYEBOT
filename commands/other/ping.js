const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply(); // Allows for 15 minute delay, normally only have 3 seconds
        await new Promise(r => setTimeout(r, 4000)); // Timeout for 4 seconds
        await interaction.editReply({ content: 'Pong!', ephemeral: false}); // Ephermal = only you can see it
        await new Promise(r => setTimeout(r, 4000));
		await interaction.editReply('Pong again!');
        await interaction.followUp('Pong again again!');
	},
};