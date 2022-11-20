const { SlashCommandBuilder } = require('discord.js');
const { playSound } = require('../../util/voice/playSound.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sound')
		.setDescription('Plays a sound!')
        .addStringOption(option =>
            option.setName('snd')
                .setDescription('The sound you want to play')
                .setRequired(true)),
	async execute(interaction) {
        playSound(interaction);
	},
};