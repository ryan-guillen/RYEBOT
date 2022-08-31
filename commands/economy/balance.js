const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check the balance of a user!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to check the balance of')
                .setRequired(false)),
	async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        return interaction.reply(`${target.tag} has **${currency.getBalance(target.id)}** RyeCoins`)
	},
};