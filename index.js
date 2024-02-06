const Discord = require("discord.js")
const { Player } = require('discord-player');
require('dotenv').config()

const process = require('node:process')

process.on("unhandledRejection", (reason, promise) => {
    console.log("Rejeição:",promise,"reason",reason);
})

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
    ],
});

const player = new Player(client);
client.player = player;

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction)
    }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.token)

const fs = require('fs');

fs.readdir('./Eventos', (err, file) => {
    file.forEach(event => {
        require(`./Eventos/${event}`)
    })
})

