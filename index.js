const Discord = require("discord.js")
const { Player } = require('discord-player');
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.IntentsBitField.Flags.GuildInvites,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildPresences,
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildEmojisAndStickers
    ],
    partials: [
        Discord.Partials.User,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember
    ]
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

