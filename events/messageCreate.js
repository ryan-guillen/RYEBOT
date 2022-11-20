const {generateImage1, generateImage2, generateTrash } = require("../util/generateImage.js")
const question = require('../util/question.js');
const { goodnight, goodmorning } = require('../util/pleasantries.js');
const currency = require('../util/economy/econ.js');

let emojis = ['<:WeirdChamp:903830977049141288>', '<:Amazing:931645432336089138>',
            '<:keysmash:903830976852033597>', '<:pensiveclown:903830975841202177>', '<:parappasadge:903836451354054676>',
            '<:bonk:903830975790874674>', '🔫', '😳', '🤮', '👻', '👺', '🙈',
            '🚗', '🐮', '💔', '🚁', '🐛', '💡', '🦒', '🌚', '🤪', '🦝', '🤓', '☢️', '👆'];
let scale = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
let eightBall = ['It is certain.', 'Signs point to yes.', 'As I see it, yes.', 'Without a doubt.', 'It is decidedly so.',
                'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.',
                'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.',
                'Outlook not so good.', 'Very doubtful.']
let allowedChannels = ['972256308411641896', '973252050991337583', '1002565247191761058', 
                        '1002437292306215003']
let bullied = [];
let chad = false;
let vMsg = '';

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: async (message) => {
        if (!allowedChannels.includes(message.channelId)) return; // Only allowed channels
        if (message.member.id == '972245671925121084') return; // Ban responses from the bot himself

        if (message.content.includes('8 ball') || message.content.includes('eight ball')) { // 8 ball responses
            let rep = Math.floor(Math.random() * 15);
            message.reply(eightBall[rep]);
            return;
        }

        if (message.content.includes('1-10')) { // Scale of 1-10 response
            let reaction = Math.floor(Math.random() * 10);
            message.react(scale[reaction]);
            return;
        }
    
        if (message.content.includes('?')) { // Question
            question(message);
            return;
        }

        // Goodnight message
        if ((message.content.toLowerCase().includes('good') && message.content.toLowerCase().includes('night'))
            || message.content.toLowerCase().includes('gn')) {
            if (message.content.toLowerCase().includes('ryebot') || message.mentions.has(message.client.user.id)) {
              goodnight(message);
              return;
            }
        }

        // Good morning message
        if (message.content.toLowerCase().includes('good morning') || message.content.toLowerCase().includes('gm')) {
            if (message.content.toLowerCase().includes('ryebot') || message.mentions.has(message.client.user.id)) {
                goodmorning(message);
                return;
            }
        }

        if (message.mentions.has(message.client.user.id))
            message.reply("Hi! I am RYEBOT!")
    
        let rand = Math.floor(Math.random() * 160);
        if (bullied.includes(message.author.id)) rand = Math.floor(Math.random() * 6);
                 
        if (message.content == 'BOOM!!!' && message.author.id == '159454106698645504') { // BOOM!!! (Deletes the previous 5 messages)
            message.channel.bulkDelete(5, true);
            await new Promise(r => setTimeout(r, 100));
            message.channel.send('🔥 BOOM!!! 🔥');
            return;
        }
        /* 
        if (rand == 0) { //react with all emojis
            for (let i = 0; i < 20; i++) {
                message.react(emojis[i]);
            }
        } 
        */ //removed all emoji reaction for now; if added back, fix single emoji reaction
        if (rand <= 1) { // React with one emoji
            let emoji = Math.floor(Math.random() * emojis.length);
            message.react(emojis[emoji]);
        }
        if (rand == 2) { // React with bubble gif
            let img = './resources/gif_bubble/' + Math.floor(Math.random() * 11) + '.gif';
            message.channel.send({
                files:[img]
            });
        } 
        if (rand == 3) { // React with text bubble
            const img = await generateImage1(message);
            message.channel.send({
                files:[img]
            })
        }
        if (rand == 4) { // Deletes message
            if(Math.floor(Math.random() * 4) == 0) {
                const img = await generateTrash(message);
                message.channel.send({content: `Oopsies! Accidentally deleted your message, sorry ${message.author} 😊`,
                    files: [img]})
                message.delete();
            }
        }
        if (rand == 5 || chad) { // React with CvS message
            if (!chad)
                vMsg = message;
            if (chad) {
                const img = await generateImage2(vMsg, message);
                message.channel.send({
                    files:[img]
                })
            }
            chad = !chad;
        }
        if (rand == 6 || rand == 7 || rand == 8) { // Give user money
            message.react('💸');
            currency.add(message.author.id, 5)
        }
        console.log(rand);
    }
}
