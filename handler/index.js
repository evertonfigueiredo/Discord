const globPromise = require('glob-promise');

module.exports = async (client) => {

    const commandFiles = await globPromise(`Comandos/**/*.js`);
    commandFiles.map((value) => {
        const file = require(`../${value}`);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.slashCommands.set(file.name, properties);
        }
    });
};