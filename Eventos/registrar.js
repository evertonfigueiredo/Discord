const Discord = require('discord.js')
const client = require('../index')

client.on("interactionCreate", async (interaction) => {

    try {
        
        if (interaction.isButton() && interaction.customId === "registrar") {
            
            let role = interaction.guild.roles.cache.find(r => r.name === "Registrado")
            await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Parabéns, cargo atribuído com sucesso!`)

            await interaction.reply({embeds: [embed], ephemeral: true})

        }


    } catch (error) {
        console.log(error);
    }


})
