const { Collection } = require('discord.js');
const { Op } = require('sequelize');
const { Users, CurrencyShop } = require('./dbObjects.js');

const currency = new Collection();

Reflect.defineProperty(currency, 'add', {
    value: async(id, amount) => {
        const user = currency.get(id);

        if (user) {
            user.balance += Number(amount);
            return user.save();
        }

        const newUser = await Users.create( {user_id: id, balance: amount });
        currency.set(id, newUser);

        return newUser;
    }
})

Reflect.defineProperty(currency, 'getBalance', {
    value: id => {
        const user = currency.get(id);
        return user ? user.balance : 0;
    }
})

module.exports = currency;