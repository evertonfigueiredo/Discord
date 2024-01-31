require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("guildMemberAdd", (member) => {
    try {
        let canal = "884499659903623268"
        if (!canal) return

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`Mais um mebro acabou de chegar \n Nome: ${member} \n Total de Membros: ${member.guild.memberCount}`)

        member.guild.channels.cache.get(canal).send({ embeds: [embed] })
    } catch (error) {
        console.log(error);
    }


})

client.on("guildMemberRemove", (member) => {
    try {
        let canal = "884499659903623268"
        if (!canal) return

        let embed = new Discord.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription(`Um mebro saiu. \n Nome: ${member} \n Total de Membros: ${member.guild.memberCount}`)

        member.guild.channels.cache.get(canal).send({ embeds: [embed] })
    } catch (error) {
        console.log(error);
    }

})