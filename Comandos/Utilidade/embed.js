const Discord = require("discord.js")

module.exports = {
  name: 'embed', // Coloque o nome do comando
  description: 'Tutorial para criar Embed!', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    // {
    //   name: 'titulo',
    //   description: 'Titulo do embed!',
    //   type: Discord.ApplicationCommandOptionType.String,
    //   // required: true,
    // }
  ],

  run: async (client, interaction) => {

    try {

      // let titulo = interaction.options.getString("titulo")

      let autorName = interaction.user.username;
      let autorAvatar = interaction.user.avatarURL()

      // let embed = new Discord.EmbedBuilder()
      //     .setColor("Random")
      //     .setTitle(titulo)
      //     .setDescription("Descrição do nosso Embed!")
      //     .setImage("https://t.ctcdn.com.br/4OYUPvt3l6HSGyxgjU58549tyBk=/1200x675/smart/i525670.png")
      //     .setThumbnail("https://www.shutterstock.com/image-vector/vinnytsia-ukraine-may-7-2023-600nw-2299584421.jpg")
      //     .setAuthor({name: autorName, iconURL: autorAvatar})
      //     .setURL("https://discord.js.org/")
      //     .setTimestamp()
      //     .setFooter({
      //         text: "Texto na parte de baixo do Embed!",
      //         iconURL: "https://www.shutterstock.com/image-vector/vinnytsia-ukraine-may-7-2023-600nw-2299584421.jpg"
      //     })

      await interaction.reply({ content: "Mensagem enviada", ephemeral: true })



      //Criação do Embed
      const exampleEmbed = new Discord.EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Titulo do Embed")

     //Envio do embed e armazenando a informação da mensagem na variável
      let msg = await interaction.channel.send({ embeds: [exampleEmbed] })

      //Função de setTimeout para modificar a mensagem depois de 1 segundo
      setTimeout(() => {
        //Modificando as informações do embed
        exampleEmbed.setColor(0x7289DA);
        exampleEmbed.setTitle("Titulo editado com sucesso!");

        //Editando a mensagem
        msg.edit({ embeds: [exampleEmbed] })
        
      }, 1000)
      



    } catch (error) {
      console.log(error);
    }

  }
}