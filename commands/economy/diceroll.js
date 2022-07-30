const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll dice to win or lose money!')
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to bet')
                .setRequired(true)),
	async execute(interaction) {
        const currentAmt = currency.getBalance(interaction.user.id);
        const bet = interaction.options.getInteger('amt');
        if (bet > currentAmt) //not enough money to give
            return interaction.reply(`Sorry, you only have ${currentAmt}.`)
        if (bet <= 0) //tries to give negative num or zero
            return interaction.reply('Please enter a number greater than zero.')
        
        if (Math.floor(Math.random() * 6) == 0) {
            currency.add(interaction.user.id, bet * 5);
            const newBal = currency.getBalance(interaction.user.id);
            return interaction.reply(`Yay! You won ${bet * 5} and your new balance is ${newBal}`);
        } 
        else {
            currency.add(interaction.user.id, -bet);
            const newBal = currency.getBalance(interaction.user.id);
            return interaction.reply(`Youch! You lost ${bet} and your new balance is ${newBal}`);
            
        }
	},
};