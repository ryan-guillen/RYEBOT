const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const currency = require('../../util/economy/econ.js');
const { betting } = require('../../util/bot.js');

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

        if (betting.get(interaction.user.id)) // They are in a bet
            return interaction.reply('You can\'t transfer while you have an active bet!');
        if (transferAmount > currentAmount) // Not enough money to give
            return interaction.reply(`Sorry, you only have ${currentAmount}.`)
        if (transferAmount <= 0) // Tries to give negative num or zero
            return interaction.reply('Please enter a number greater than zero.')
        // Otherwise, continue
        currency.add(interaction.user.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);

        if (transferTarget.id == interaction.client.user.id) { // If they are transferring to ryebot
            const fileName = '../../data/lottery.json'
            const file = require(fileName);
            const donater = interaction.user.id;
            if (!file[donater]) // If they havent donated before, put them in the json
                file[donater] = transferAmount;
            else
                file[donater] += transferAmount;
                console.log(file);
            
            fs.writeFile('./data/lottery.json', JSON.stringify(file, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            }) 
        }

        return interaction.reply(`**${transferAmount}** RyeCoins has been given to ${transferTarget.tag}`);
	},
};