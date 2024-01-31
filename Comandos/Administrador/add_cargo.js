const Discord = require("discord.js")

module.exports = {
    name: 'addcargo', // Coloque o nome do comando
    description: 'Dar cargo especifico para o usuario', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'cargo',
            description: 'Cargo que você atribuir ao usuário',
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'usuario',
            description: 'Usuario que vai receber o cargo',
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
            let role = interaction.options.getRole("cargo")

            interaction.guild.members.cache.get(usuario.id).roles.add(role)

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("Cargo Atribuido com Sucesso!")
                .setDescription(`Usuário ${usuario.globalName} ganhou o cargo ${role}. \n Esse usuario agora pode realizar as ações que esse cargo oferece!`)
                .setTimestamp()

            interaction.reply({embeds: [embed]})

        } catch (error) {
            console.log(error);
        }

    }
}