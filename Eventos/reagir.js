require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on('messageCreate', (interaction) => {

    try {
        if (interaction.channel.id === "1176580941343358997") {
            // interaction.react("😊");
        }
    } catch (error) {

    }
})