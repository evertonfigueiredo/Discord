const Discord = require("discord.js")

module.exports = {
  name: 'embed', // Coloque o nome do comando
  description: 'Tutorial para criar Embed!', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'titulo',
        description: 'Titulo do embed!',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    try {
        
        let titulo = interaction.options.getString("titulo")

        let autorName = interaction.user.username;
        let autorAvatar = interaction.user.avatarURL()

        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(titulo)
            .setDescription("Descrição do nosso Embed!")
            .setImage("https://t.ctcdn.com.br/4OYUPvt3l6HSGyxgjU58549tyBk=/1200x675/smart/i525670.png")
            .setThumbnail("https://www.shutterstock.com/image-vector/vinnytsia-ukraine-may-7-2023-600nw-2299584421.jpg")
            .setAuthor({name: autorName, iconURL: autorAvatar})
            .setURL("https://discord.js.org/")
            .setTimestamp()
            .setFooter({
                text: "Texto na parte de baixo do Embed!",
                iconURL: "https://www.shutterstock.com/image-vector/vinnytsia-ukraine-may-7-2023-600nw-2299584421.jpg"
            })

        await interaction.reply({embeds: [embed]})


    } catch (error) {
        console.log(error);
    }
    
  }
}