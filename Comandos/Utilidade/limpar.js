const Discord = require("discord.js")

module.exports = {
    name: 'limpar', // Coloque o nome do comando
    description: 'Comando para limpar mensagens do chat', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Quantidade de msgs a ser apagada de 1 a 100',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        try {

            let qtd = interaction.options.getInteger("quantidade")

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("Chat limpo com sucesso!")

            let embed_err = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("Você só pode excluir em massa mensagens com menos de 14 dias.")
            
            interaction.channel.bulkDelete(qtd)
            .then(() => {
                interaction.reply({embeds: [embed], ephemeral: true})
            })
            .catch((err) => {
                console.log(err);
                if (err.code) {
                    interaction.reply({embeds: [embed_err], ephemeral: true})
                }
            })


        } catch (error) {
            console.log(error);
        }


    }
}