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
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('There was an error!');
    }
}