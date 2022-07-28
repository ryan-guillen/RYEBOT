const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Initiate a rock paper scissors game!')
        .addUserOption(option =>
            option.setName('opponent')
                .setDescription('The opponent you are facing')
                .setRequired(true)),
	async execute(interaction) {
		const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder() //create button to accept game
                    .setCustomId('rpsAccept')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success),
            );
        const opponent = interaction.options.getUser('opponent');
        await interaction.reply({ content: `${opponent}, will you play RPS against ${interaction.user}?`, components: [row]})

        const rpsRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder() //create rock button
                .setCustomId('rock')
                .setLabel('Rock')
                .setStyle(ButtonStyle.Primary), //create paper button
            new ButtonBuilder()
                .setCustomId('paper')
                .setLabel('Paper')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder() //create scissors button
                .setCustomId('scissors')
                .setLabel('Scissors')
                .setStyle(ButtonStyle.Primary),
        )

        const message = await interaction.fetchReply();
        let determine = 0;
        let p1;
        let p2;
        const filter = (BtnInt) => {
            console.log(BtnInt);
            if (BtnInt.customId == 'rpsAccept')
                return opponent.id === BtnInt.user.id;
            else { //controls who can still choose an option
                if (interaction.user.id === BtnInt.user.id && determine != 1) {
                    determine += 1;
                    p1 = BtnInt.customId;
                    return true;
                }
                if (opponent.id === BtnInt.user.id && determine != 2) {
                    determine += 2;
                    p2 = BtnInt.customId;
                    return true;
                }
            }
        }

        const collector = message.createMessageComponentCollector({
            filter,
            max: 3, //3 button touches, accept -> p1 choice -> p2 choice
            time: 60000 //60 seconds
        })

        collector.on('collect', (i) => {
            /* i.reply({
                content: 'you clicked a button!'
            }) */
            console.log('button clicked');
            if (i.customId == 'rpsAccept') {
                interaction.editReply({
                    content: `${interaction.user} and ${opponent}, pick an option!`, 
                    components: [rpsRow]
                })
            }
        })

        collector.on('end', async (collection) => {
            /*
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            }) */

            console.log(p1, p2);
            if (p1 == p2) { //win determiner
                interaction.editReply({content: 'You both tied!', components: []})
            }
            else if ((p1 == 'rock' && p2 == 'scissors') ||
                    (p1 == 'paper' && p2 == 'rock') ||
                    (p1 == 'scissors' && p2 == 'paper')) {
                interaction.editReply({content: `${interaction.user} won!`, components: []})
            }
            else {
                interaction.editReply({content: `${opponent} won!`, components: []})
            }
        })      
	},
};