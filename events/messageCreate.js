const {generateImage1, generateImage2} = require("../util/generateImage.js")

let emojis = ['<:WeirdChamp:903830977049141288>', '<:Amazing:931645432336089138>', '<:PEE:903823649553936414>',
            '<:keysmash:903830976852033597>', '<:pensiveclown:903830975841202177>', '<:parappasadge:903836451354054676>',
            '<:bonk:903830975790874674>', '<:marineyass:981707301612310568>', '🏳️‍🌈', '🔫', '😳', '🤮', '👻', '👺', '🙈', '🍌',
            '🚗', '🍆', '🐮', '💔', '🚁', '🐛', '💡', '🦒', '🌚', '🤪', '🦝', '🤓', '👅', '☢️', '👣', '👆'];
let allowedChannels = ['972256308411641896', '973252050991337583', '905463817918611456', '903811651466330122']
let bullied = [];
let chad = false;
let virgMsg = '';
//905463817918611456
//903811651466330122

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: async (message) => {
        if (!allowedChannels.includes(message.channelId)) return; //only allowed channels
        if (message.member.id == '972245671925121084') return; //ban responses from the bot himself
    
        if (message.mentions.has(message.client.user.id))
            message.reply("Hi! I am RYEBOT!")
    
        if(message.content == "hi") {
            message.reply("Hello World");
            message.react('😎');
        }
    
        let rand = Math.floor(Math.random() * 33);
        if (bullied.includes(message.author.id)) rand = Math.floor(Math.random() * 6);
                 
    
        if (message.content.includes('?')) { //question
            let i = Math.floor(Math.random() * 100)
            if(i < 35) {
                message.react('🇳');
                message.react('🇴');
            }
            else if(i < 50) {
                message.react('🇾');
                message.react('🇪');
                message.react('🇸');
            }
            return;
        }
        if (message.content == 'BOOM!!!' && message.author.id == '159454106698645504') { //BOOM!!!
            message.channel.bulkDelete(5, true);
            message.channel.send('🔥 BOOM!!! 🔥');
            return;
        }
        if (rand == 0) { //react with all emojis
            for (let i = 0; i < 20; i++) {
                message.react(emojis[i]);
            }
        } 
        if (rand == 1) { //react with bubble gif
            let img = './resources/gif_bubble/' + Math.floor(Math.random() * 9) + '.gif';
            message.channel.send({
                files:[img]
            });
        } 
        if (rand == 2) { //react with one emoji
            let emoji = Math.floor(Math.random() * emojis.length);
            message.react(emojis[emoji]);
        }
        if (rand == 3) { //react with text bubble
            const img = await generateImage1(message);
            message.channel.send({
                files:[img]
            })
        }
        if (rand == 4) { //deletes message
            if(Math.floor(Math.random() * 6) == 0) {
                message.channel.send(`Oopsies! Accidentally deleted your message, sorry ${message.author} 😊`)
                message.delete();
            }
        }
        if (rand == 5 || chad) { //react with chad message
            if (!chad)
                virgMsg = message;
            if (chad) {
                const img = await generateImage2(virgMsg, message);
                message.channel.send({
                    files:[img]
                })
            }
            chad = !chad;
        }
        console.log(rand);
    }
}
//ryan: 159454106698645504
//josh: 159086780535013376
//caden: 555552842383884330
//bot: 972245671925121084
//ash: 677596600960286720
//quin: 509459862934257668