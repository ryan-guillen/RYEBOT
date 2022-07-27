module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch {
            console.error(error);
            await interaction.reply('There was an error!');
        }
    }
}