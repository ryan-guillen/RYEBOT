const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admingive')
		.setDescription('Gives money to a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to give money')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to give')
                .setRequired(true)),
	async execute(interaction) {
        if (interaction.user.id != 159454106698645504) //only allow dev to use
            return interaction.reply('You aren\'t powerful enough!');

        let target = interaction.options.getUser('user');
		currency.add(target.id, interaction.options.getInteger('amt'));
        return interaction.reply(`${target} has been given **${interaction.options.getInteger('amt')}** RyeCoins`);
	},
};