const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('Beg Ryebot for RyeCoins'),
	async execute(interaction) {
        let target = interaction.user;
		let rand = (Math.floor(Math.random() * 100)) + 50;
        currency.add(target.id, rand); //gives them pity 50 - 150 coins
        return interaction.reply(`Here's **${rand}** RyeCoins!`);
	},
    cooldown: 7200000
};