const Discord = require("discord.js")

module.exports = {
  name: "mensagem", // Coloque o nome do comando
  description: "Envia uma mensagem para o canal que foi executado.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    try {
      
      await interaction.channel.send({content: "Mensagem que o bot vai enviar!"})

      await interaction.reply({content:"Mensagem de responta do Bot para você",ephemeral: true})

    } catch (error) {
      console.log(error);
    }

  }
}