const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('Beg Ryebot for RyeCoins'),
	async execute(interaction) {
        let target = interaction.user;
        currency.add(target.id, 100); //gives them pity 5 coins
        return interaction.reply(`Here's 100 RyeCoins!`);
	},
    cooldown: 7200000
};