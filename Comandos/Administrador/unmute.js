const Discord = require("discord.js")

module.exports = {
    name: 'unmute', // Coloque o nome do comando
    description: 'Comando para que o usuario volte a interagir', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'Usuario que vai voltar a interagir',
            type: Discord.ApplicationCommandOptionType.User,
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

            let usuario = interaction.options.getUser("usuario")

            let autorName = interaction.user.username;
            let autorAvatar = interaction.user.avatarURL()

            let role = interaction.guild.roles.cache.find(r => r.name === "MUTADO")

            await interaction.guild.members.cache.get(usuario.id).roles.remove(role)

            let embed = new Discord.EmbedBuilder()
                .setColor("DarkGreen")
                .setTitle(`Usuário ${usuario.globalName} desmutado!`)
                .setDescription("Esse usuário pode falar novamente na comunidade!")
                .setAuthor({ name: autorName, iconURL: autorAvatar })
                .setTimestamp()

            await interaction.reply({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}