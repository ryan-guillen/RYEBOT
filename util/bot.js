const { Collection } = require("discord.js")
const fs = require('fs');
const currency = require('../util/economy/econ.js');

const cooldowns = new Collection();
const betting = new Collection();

const lottery = (client) => {
    let winner;
    let prize = 0;
    fs.readFile("./data/lottery.json", "utf8", (err, jsonString) => {
        if (err) return console.log(err);
        try {
            const donations = JSON.parse(jsonString);
            console.log(donations) //adds all donations to prizepool
            for (const donator in donations) {
                prize += donations[donator];
            }

            //picks winner, factoring in how much they donated
            let rand = Math.ceil(Math.random() * prize);
            let counter = 0;
            for (const donator in donations) {
                counter += donations[donator];
                if (rand <= counter) {
                    winner = donator;
                    break;
                }
            }
            
            fs.writeFile('./data/lottery.json', JSON.stringify({}, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            })  //clears out json file for the next lottery
        } 
        catch (err) { console.log(err); }

        if(winner) {
            winner = client.users.fetch(winner)
            .then(win => {
                const chan = client.channels.cache.get('972256308411641896');
                chan.send(`${win} won ${prize} RyeCoins from the lottery! Congratulations!`)
                currency.add(win.id, prize);
                currency.add(client.user.id, -prize);
            })
        }
    })  
}

const startLottery = (client) => {
    lottery(client);
    setInterval(function() { lottery(client) }, 86400000) //repeats lottery every day
}

const timeEvents = (client) => {
    let now = new Date();
    let millTill = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30, 0, 0) - now;
    if (millTill < 0) {
        millTill += 86400000;
    }
    //starts the lottery at 8:30, then repeats it daily
    setTimeout(function() { startLottery(client) }, millTill);
}

module.exports = {
    cooldowns,
    betting,
    timeEvents
}