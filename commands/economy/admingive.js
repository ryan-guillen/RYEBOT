const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admingive')
		.setDescription('gives money to a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to give money')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to give')
                .setRequired(true)),
	async execute(interaction) {
        if (interaction.user.id != 159454106698645504) { //only allow dev to use
            if (currency.getBalance(interaction.options.getUser('user').id) < 5) {
                currency.add(interaction.options.getUser('user').id, 5); //gives them pity 5 coins
                return interaction.reply(`Okay, they can have 5.`);
            }
            return interaction.reply('Nice try! You can\'t do that!');
        }

		currency.add(interaction.options.getUser('user').id, interaction.options.getInteger('amt'));
        return interaction.reply('Success!');
	},
};