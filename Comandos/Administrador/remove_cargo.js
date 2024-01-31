const Discord = require("discord.js")

module.exports = {
    name: 'removecargo', // Coloque o nome do comando
    description: 'Remove um cargo especifico para o usuario', // Coloque a descrição do comando
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

            interaction.guild.members.cache.get(usuario.id).roles.remove(role)

            let embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("Cargo Removido com Sucesso!")
                .setDescription(`Usuário ${usuario.globalName} perdeu o cargo ${role}. \n Esse usuario agora não pode realizar as ações que esse cargo oferece!`)
                .setTimestamp()

            interaction.reply({embeds: [embed]})

        } catch (error) {
            console.log(error);
        }

    }
}