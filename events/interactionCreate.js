const { cooldowns } = require('../util/bot.js')

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction) => {
        if (interaction.isChatInputCommand()) 
            handleCommands(interaction);      
    }
}

const handleCommands = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        if(command.cooldown) {
            let cooldownUntil = cooldowns.get(`${command.name}-${interaction.user.id}`)
            if (cooldownUntil && cooldownUntil > Date.now())
                return interaction.reply(`On cooldown for ${Math.ceil((cooldownUntil - Date.now())/1000)} seconds`)
            cooldowns.set(`${command.name}-${interaction.user.id}`, new Date().valueOf() + command.cooldown)
        } 
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('There was an error!');
    }
}