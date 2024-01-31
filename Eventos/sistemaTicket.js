require('../index')

const Discord = require('discord.js')
const client = require('../index')


client.on('interactionCreate', (interaction) => {

    try {
        if (interaction.isStringSelectMenu() && interaction.customId === "painel_ticket") {
            let opc = interaction.values[0]
            if (opc === "suporte") {
                let canalNome = `🔧-${interaction.user.id}`
                criarChat(canalNome, "Suporte", interaction)
            }

            if (opc === "bot") {
                let canalNome = `🤖-${interaction.user.id}`
                criarChat(canalNome, "Bot", interaction)
            }

            if (opc === "programacao") {
                let canalNome = `💻-${interaction.user.id}`
                criarChat(canalNome, "Programação", interaction)
            }
        }

        if (interaction.isButton() && interaction.customId === "fechar_ticket") {
            interaction.reply(`Esse ticket será excluido em 5 segundos...`).then(() => {
                setTimeout(() => {
                    interaction.channel.delete().catch(() => { return })
                },5000)
            })
        }
    } catch (error) {
        console.log(error);
    }

})

function criarChat(nome, tipo, interaction) {

    //Pesquisando se existe ticket aberto
    let canalTicket = interaction.guild.channels.cache.find(canal => canal.name === nome)
    if (canalTicket) {
        return interaction.reply({ content: `❌ Você já possui um ticket em aberto em ${canalTicket}`, ephemeral: true })
    }

    //Pesquisando se existe a categoria informada
    let categoria = "1202309215146745896"
    if (!interaction.guild.channels.cache.get(categoria)) {
        categoria == null
    }

    interaction.guild.channels.create({
        name: nome,
        type: Discord.ChannelType.GuildText,
        parent: categoria,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                ]
            },
            {
                id: interaction.user.id,
                allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                ]
            }
        ]
    }).then((channel) => {
        interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${channel}!`, ephemeral: true })

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção de ${tipo}.`)

        let botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("fechar_ticket")
                    .setEmoji("🔒")
                    .setLabel("Fechar Ticket")
                    .setStyle(Discord.ButtonStyle.Danger)
            )

        channel.send({ embeds: [embed], components: [botao] }).then(mensage => {
            mensage.pin()
        })
    })


}
