const Discord = require("discord.js")

module.exports = {
    name: 'timer', // Coloque o nome do comando
    description: 'Realiza a execução de algum comando depois do tempo', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'tempo',
            description: 'Tempo em minutos para executar!',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        try {

            let tempo = interaction.options.getInteger("tempo")
            tempo = tempo * 60 * 1000;

            let embed_1 = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Olá ${interaction.user}, o comando foi executado!`)

            let embed_2 = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Olá ${interaction.user}, o tempo acabou!`)

            interaction.reply({embeds: [embed_1]}).then(() => {
                setTimeout(() => {
                    //Executa qualquer comando depois do tempo definido!
                    interaction.editReply({embeds: [embed_2]})
                }, tempo)
            })

        } catch (error) {
            console.log(error);
        }

    }
} 