require('../index')

const Discord = require('discord.js')
const client = require('../index')


client.on('interactionCreate', (interaction) => {

    try {
        if (interaction.isButton() && interaction.customId === "registrar") {
            let role = interaction.guild.roles.cache.find(r => r.name === "Registrado")
            interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Parabéns, cargo atribuido com sucesso!`)
            
            interaction.reply({embeds: [embed], ephemeral: true})
        }
    } catch (error) {

    }
})