const Discord = require("discord.js")

module.exports = {
  name: 'dm', // Coloque o nome do comando
  description: 'Envia uma mensagem no DM do usuário selecionado', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'usuario',
        description: 'usuario que vai receber a msg',
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: 'msg',
        description: 'mensagem a ser enviada para o usuário selecionado',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    try {
        
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                content: "⚠️ Você precisa fazer parte da STAFF para poder usar esse comando.",
                ephemeral: true
            })
        }

        let user = interaction.options.getUser("usuario")
        let msg = interaction.options.getString("msg")


        let embed = new Discord.EmbedBuilder()
        .setDescription(msg)

        user.send({embeds: [embed]})
        interaction.reply({
            content: "✅Mensagem enviada com sucesso!",
            ephemeral: true
        })

    } catch (error) {
        console.log(error);
    }

    
  }
}