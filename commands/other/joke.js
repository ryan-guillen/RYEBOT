const { SlashCommandBuilder } = require('discord.js');

jokes = [
    {
        setup: 'Why did the scarecrow get a promotion?',
        punchline: 'Because he was *out-standing* in his field!'
    },
    {
        setup: 'Why did the scarecrow win a nobel prize?',
        punchline: 'Because he was *out-standing* in his field!'
    },
    {
        setup: 'Why did the scarecrow win an award?',
        punchline: 'Because he was *out-standing* in his field!'
    }
]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Tell a joke!'),
	async execute(interaction) {
        let rand = Math.floor(Math.random() * jokes.length);
        interaction.reply(jokes[rand].setup);
		await new Promise(r => setTimeout(r, 14000));
        interaction.channel.send(jokes[rand].punchline);
	},
};