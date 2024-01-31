const Discord = require("discord.js")

module.exports = {
    name: 'registrar', // Coloque o nome do comando
    description: 'Comando para registrar apertando no botão', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        try {
            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Olá seja bem-vindo, para que você possa ter acesso a todo o conteudo do nosso servidor clique no botão abaixo e registre-se.`)

            let botao = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("registrar")
                        .setEmoji("✅")
                        .setLabel("Registre-se")
                        .setStyle(Discord.ButtonStyle.Primary)
                )

            interaction.reply({ embeds: [embed], components: [botao] })
        } catch (error) {
            console.log(error);
        }

    }
}