const currency = require('../util/economy/econ.js')
const { Users } = require('../util/economy/dbObjects.js')

module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        const storedBalances = await Users.findAll();
        storedBalances.forEach(b => currency.set(b.user_id, b));

        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity("Among Us");
    }
}