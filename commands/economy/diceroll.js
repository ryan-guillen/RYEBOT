const { SlashCommandBuilder } = require('discord.js');
const currency = require('../../util/economy/econ.js');
const { betting } = require('../../util/bot.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll dice to win or lose money!')
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to bet')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('times')
                .setDescription('The amount of times you want to diceroll')
                .setRequired(false)),
	async execute(interaction) {
        const currentAmt = currency.getBalance(interaction.user.id);
        const bet = interaction.options.getInteger('amt');
        let times = interaction.options.getInteger('times');
        if (!times) times = 1;
        if (bet * times > currentAmt) // Not enough money to give
            return interaction.reply(`Sorry, you only have ${currentAmt} RyeCoins.`);
        if (bet <= 0) // Tries to give negative num or zero
            return interaction.reply('Please enter a number greater than zero.');
        if (times <= 0)
            return interaction.reply('Please enter a number greater than zero.');
        if (times > 15)
            return interaction.reply('The max times you can roll is 15 times.');    
        if (betting.get(interaction.user.id))
            return interaction.reply('You can\'t diceroll with another bet active.');
        
        let msg = '';
        for (let i = 0; i < times; i++) {
            if (Math.floor(Math.random() * 6) == 0) {
                currency.add(interaction.user.id, bet * 5);
                const newBal = currency.getBalance(interaction.user.id);
                msg += `💹 Yay! You won **${bet * 5}** and your new balance is **${newBal}** 💹\n`;
            } 
            else {
                currency.add(interaction.user.id, -bet);
                const newBal = currency.getBalance(interaction.user.id);
                msg += `❌ Youch! You lost **${bet}** and your new balance is **${newBal}** ❌\n`;
            }
        }
        return interaction.reply(msg);
	},
};