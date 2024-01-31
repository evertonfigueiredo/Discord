const Discord = require("discord.js")

module.exports = {
    name: 'ticket', // Coloque o nome do comando
    description: 'Abre o painel de tickets.', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        try {

            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {
                return interaction.reply({
                    content: "⚠️ Você precisa fazer parte da STAFF para poder usar esse comando.",
                    ephemeral: true
                })
            }

            let embed = new Discord.EmbedBuilder()
                .setColor("DarkGold")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`Abra um ticket selecionando uma das opções abaixo:`)

            let painel = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('painel_ticket')
                        .setPlaceholder("Clique aqui")
                        .setOptions(
                            {
                                label: "Suporte",
                                description: "Algo relacionado ao Servidor do Discord",
                                value: "suporte"
                            },
                            {
                                label: "Bot",
                                description: "Algo relacionado ao Bot Commands",
                                value: "bot"
                            },
                            {
                                label: "Programação",
                                description: "Algo relacionado a Programação",
                                value: "programacao"
                            }
                        )
                );

                interaction.reply({content: `✅ Mensagem enviada!`, ephemeral: true})
                interaction.channel.send({embeds: [embed], components: [painel]})

        } catch (error) {
            console.log(error);
        }


    }
}