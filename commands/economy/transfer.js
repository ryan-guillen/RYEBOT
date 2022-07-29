const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Transfer money to another user!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to give money')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to give')
                .setRequired(true)),
	async execute(interaction) {
        const currentAmount = currency.getBalance(interaction.user.id);
        const transferAmount = interaction.options.getInteger('amt');
        const transferTarget = interaction.options.getUser('user');

        if (transferAmount > currentAmount) //not enough money to give
            return interaction.reply(`Sorry, you only have ${currentAmount}.`)
        if (transferAmount <= 0) //tries to give negative num or zero
            return interaction.reply('Please enter a number greater than zero.')
        //otherwise, continue
        currency.add(interaction.user.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);

        return interaction.reply(`Success!`);
	},
};