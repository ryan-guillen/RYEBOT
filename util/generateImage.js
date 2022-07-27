const Canvas = require("canvas");
const Discord = require("discord.js");



const generateImage1 = async (message) => {
    const imgBack = "./resources/meme_maker/text_bubble.png";
    const dim = {
        height: 613,
        width: 680
    }


    let username = message.author.username;
    //let avatarURL = message.author.displayAvatarURL({format: "png", dynamic: false, size: 256})

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    const backimg = await Canvas.loadImage(imgBack);
    ctx.drawImage(backimg, 0, 0);

    ctx.fillStyle = "black";
    ctx.textAlign = "left";

    ctx.font = "50px comic-sans";
    let inc = 30;
    let spot = 50;
    for (let i = 0; i < message.content.length; i += inc) {
        let msg = message.content.slice(i, i+inc);
        ctx.fillText(msg, 1, spot)
        spot += 51;
    }

    ctx.font = "bold 50px"
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(username, 150, 500);

    const attachment = new Discord.Attachment({url: canvas.toBuffer(), name: "b.png"});
    return attachment;
}

const generateImage2 = async (vMessage, cMessage) => {
    const imgBack = "./resources/meme_maker/chad.jpg";
    const dim = {
        height: 486,
        width: 800
    }

    let cUsername = cMessage.author.username;
    let vUsername = vMessage.author.username;
    //let cAvatarURL = cMessage.author.displayAvatarURL({format: "png", dynamic: false, size: 256})
    //let vAvatarURL = vMessage.author.displayAvatarURL({format: "png", dynamic: false, size: 256})

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    const backimg = await Canvas.loadImage(imgBack);
    ctx.drawImage(backimg, 0, 0);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.font = "30px comic-sans";
    let inc = 24;
    let spot = 50;
    for (let i = 0; i < vMessage.content.length; i += inc) { //virgin message
        let msg = vMessage.content.slice(i, i+inc);
        ctx.fillText(msg, 200, spot)
        spot += 31;
    }

    spot = 50;
    for (let i = 0; i < cMessage.content.length; i += inc) { //chad message
        let msg = cMessage.content.slice(i, i+inc);
        ctx.fillText(msg, 600, spot)
        spot += 31;
    }

    //write usernames
    ctx.fillText(vUsername, 200, 475)
    ctx.fillText(cUsername, 600, 475)


    const attachment = new Discord.Attachment({url: canvas.toBuffer(), name: "b.png"});
    return attachment;
}

module.exports = {generateImage1, generateImage2};