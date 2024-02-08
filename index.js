const Discord = require("discord.js")
const globPromise = require('glob-promise');
require('dotenv').config()

const process = require('node:process')

process.on("unhandledRejection", (reason, promise) => {
    console.log("Rejeição:", promise, "reason", reason);
})

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages,
    ],
});

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    command.run(client, interaction);

})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.token)

async function ler_eventos() {
    let eventos = await globPromise("./Eventos/*.js")
    eventos.map((value) => {
        const file = require(`${value}`)
    })
}

ler_eventos()


