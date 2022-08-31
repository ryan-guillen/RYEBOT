const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } = require('discord.js');
const currency = require('../../util/economy/econ.js');
const { betting } = require('../../util/bot.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin to win or lose money!')
        .addIntegerOption(option =>
            option.setName('amt')
                .setDescription('The amount of money to bet')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you\'re make the bet with')
                .setRequired(false)),
	async execute(interaction) {
        const currentAmt = currency.getBalance(interaction.user.id);
        const bet = interaction.options.getInteger('amt');

        if (bet > currentAmt) //not enough money to give
            return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmt} RyeCoins.`);
        if (bet <= 0) //tries to give negative num or zero
            return interaction.reply('Please enter a number greater than zero.');    
        if (betting.get(interaction.user.id)) //they are in a bet
            return interaction.reply('You can\'t coinflip with another bet active.');

        const opponent = interaction.options.getUser('user');
        if (!opponent) { //if not betting against someone else    
            if (Math.floor(Math.random() * 2) == 0) {
                currency.add(interaction.user.id, bet);
                const newBal = currency.getBalance(interaction.user.id);
                return interaction.reply(`💹 Yay! You won **${bet}** and your new balance is **${newBal}** 💹`);
            } 
            else {
                currency.add(interaction.user.id, -bet);
                const newBal = currency.getBalance(interaction.user.id);
                return interaction.reply(`❌ Youch! You lost **${bet}** and your new balance is **${newBal}** ❌`);
            }
        }

        //else, bet against someone else
        const opponentAmt = currency.getBalance(opponent.id);
        if (bet > opponentAmt) //opponent doesnt have enough
            return interaction.reply(`${opponent.tag} only has ${opponentAmt} RyeCoins`)
        if (interaction.user.id == opponent.id) //tries to bet themselves
            return interaction.reply('You can\'t bet yourself!');
        if (betting.get(opponent.id)) //opponent is in a bet
            return interaction.reply('Your opponent has another bet active.');
        
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder() //create rock button
                .setCustomId('accept')
                .setLabel('Accept Bet')
                .setStyle(ButtonStyle.Success), //create paper button
        )
        await interaction.reply({ content: `${opponent}, will you coinflip against ${interaction.user}? for **${bet}** RyeCoins?`, components: [row]})

        if (opponent.id != interaction.client.user.id) { //if opponent is not ryebot
            betting.set(interaction.user.id, true); //sets betting state to true
            betting.set(opponent.id, true); //sets opponents betting state to true
            const message = await interaction.fetchReply();
            const filter = (BtnInt) => { return opponent.id === BtnInt.user.id; }
            const collector = message.createMessageComponentCollector({
                filter,
                max: 1, 
                time: 30000 //30 seconds
            })

            collector.on('collect', (i) => {
                if (Math.floor(Math.random() * 2) == 0) {
                    currency.add(interaction.user.id, bet);
                    currency.add(opponent.id, -bet)
                    return interaction.editReply({content: `${interaction.user} won the bet for ${bet} RyeCoins!`,
                        components: []});
                }
                else {
                    currency.add(interaction.user.id, -bet);
                    currency.add(opponent.id, bet)
                    return interaction.editReply({content: `${opponent} won the bet for ${bet} RyeCoins!`,
                        components: []});
                }
            })

            collector.on('end', async (collection) => {
                betting.set(interaction.user.id, false);
                betting.set(opponent.id, false);
                if (collection.size == 0)
                    return interaction.editReply({content: `The bet wasn't accepted fast enough.`,
                        components: []});
                
            })   
        }
        else { //if ryebot is the opponent
            if (Math.floor(Math.random() * 2) == 0) {
                currency.add(interaction.user.id, bet);
                currency.add(opponent.id, -bet)
                return interaction.editReply({content: `${interaction.user} won the bet for ${bet} RyeCoins!`,
                    components: []});
            }
            else {
                currency.add(interaction.user.id, -bet);
                currency.add(opponent.id, bet)
                return interaction.editReply({content: `${opponent} won the bet for ${bet} RyeCoins!`,
                    components: []});
            }
        }
	},
};