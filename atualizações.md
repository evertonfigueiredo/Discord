```
 const commandFiles = await globPromise(`${process.cwd()}/comandos/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
});
```
  

  Mudar no lugar do FS

  ----------------
```
  const { GatewayIntentBits, Client, Collection } = require("discord.js");
require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.slashCommands = new Collection();

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    command.run(client, interaction);
});

client.once("ready", () => {
    console.log(`Bot está online!`)
});

require("./handlers")(client);
client.login(process.env.token);
```
