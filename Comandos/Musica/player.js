const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const Discord = require("discord.js")

module.exports = {
    name: 'player',
    description: 'Comando para dar play na música',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'musica',
            description: 'Descrição da música que você quer!',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        try {

            await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('musica');
            console.log(query);
            const searchResult = await player.search(query)
            // if (!searchResult.hasTracks())
            //     return void interaction.followUp({content: 'No results were found!'});

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 10
                        //defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

                await interaction.followUp({
                    content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'An error has occurred!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'There was an error trying to execute that command: ' + error.message,
            });
        }
    }
}
