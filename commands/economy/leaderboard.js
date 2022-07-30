const { SlashCommandBuilder, Formatters } = require('discord.js');
const currency = require('../../util/economy/econ.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Check who has the most RyeCoins!'),
	async execute(interaction) {
        return interaction.reply (
            Formatters.codeBlock(
                currency.sort((a, b) => b.balance - a.balance)
                    .filter(user => interaction.client.users.cache.has(user.user_id))
                    .first(5)
                    .map((user, position) => `(${position + 1}) ${interaction.client.users.cache.get(user.user_id).tag}: ${user.balance} RyeCoins`)
                    .join('\n'),
            )
        )
	}
};