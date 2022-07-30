const currency = require('../util/economy/econ.js')
const { Users } = require('../util/economy/dbObjects.js')
const { timeEvents } = require('../util/bot.js');

module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        const storedBalances = await Users.findAll();
        storedBalances.forEach(b => currency.set(b.user_id, b));
        timeEvents(client);

        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity("Among Us");
    }
}