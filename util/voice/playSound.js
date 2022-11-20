const { VoiceConnectionStatus, AudioPlayerStatus, StreamType,
    joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
//import { v4 as uuidv4 } from 'uuid';

const playSound = (interaction) => {

    let sound = interaction.options.getString;

    let channel = interaction.member.voice.channel;
    if (interaction.member.voice.channel == null) return console.log('no voice');
    interaction.deferReply();

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop,
        },
    });
    
    /* //best performance, only works with .ogg files
    let resource = createAudioResource('resources/sounds/music/parlor.ogg', {
        inputType: StreamType.OggOpus,
    });  */
    
    let resource = createAudioResource('resources/sounds/music/parlor.ogg', {
        inlineVolume: true
    })
    resource.volume.setVolume(0.1);
    player.play(resource);
    const subscription = connection.subscribe(player);

    connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
        console.log(`Connection is in the ready ${newState}`)
    })

    player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
        console.log(`Audio player is in ${newState}`)
    })  



}
/*
const requestTTS = (voice, message) => {
    const response = await fetch('https://api.fakeyou.com/tts/inference', {
        body: JSON.stringify({
            tts_model_token: 'TM:7wbtjphx8h8v',
            uuid_idempotency_token: uuidv4(),
            inference_text: 'this is a test'
        })
    })

    const json = await response.json();

    return await
}
*/
module.exports = {
    playSound
}