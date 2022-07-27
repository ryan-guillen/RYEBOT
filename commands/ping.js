const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply(); // allows for 15 minute delay, normally only have 3 seconds
        await new Promise(r => setTimeout(r, 4000)); //timeout for 4 seconds
        await interaction.editReply({ content: 'Pong!', ephemeral: true}); //ephermal = only you can see it
        await new Promise(r => setTimeout(r, 4000));
		await interaction.editReply('Pong again!');
        //await interaction.deleteReply(); // you can delete the reply if you want to
        await interaction.followUp('Pong again again!');
	},
};
