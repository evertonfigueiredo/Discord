const globPromise = require('glob-promise');
const path = require('path');

module.exports = async (client) => {
    const commandFiles = await globPromise(`Comandos/**/*.js`);

    const SlashsArray = [];

    for (const value of commandFiles) {
        const file = require(path.resolve(value)); // Resolve o caminho absoluto do arquivo
        const directory = path.dirname(value).split(path.sep).pop(); // Obtém o diretório pai do arquivo

        if (file.name) {
            const properties = { directory, ...file };
            client.slashCommands.set(file.name, properties);
            SlashsArray.push(file);
        }
    }

    // Defina os comandos no evento ready do client
    client.on("ready", async () => {
        client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray));
    });
};