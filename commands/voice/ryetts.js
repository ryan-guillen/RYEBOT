const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ryetts')
		.setDescription('Text to speech sentence said in a funny voice!')
        .addStringOption(option =>
            option.setName('voice')
                .setDescription('The voice that tts will speak in')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sentence')
                .setDescription('The sentence that will be spoken')
                .setRequired(true)),
	async execute(interaction) {
        playSound(interaction);
	},
};