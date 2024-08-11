import { readdirSync } from "fs";
import { Collection } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export async function loader() {
  client.commands = new Collection();
  const CommandsArray = [];

  const events = readdirSync("./src/events/").filter((file) =>
    file.endsWith(".js")
  );

  console.log(`Loading events...`);
  for (const file of events) {
    const event = await import(`../events/${file}`);
    client.on(file.split(".")[0], event.default.bind(null, client));
  }
  console.log(`-> [Loaded Events]`);

  console.log(`Loading commands...`);
  readdirSync("./src/commands/").forEach((dirs) => {
    const commands = readdirSync(`./src/commands/${dirs}`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      import(`../commands/${dirs}/${file}`).then((commandModule) => {
        const command = commandModule.default;

        if (
          client.config.enabledCommands.enableAll
            ? command.name && command.description
            : command.name && command.description && command.enabled
        ) {
          CommandsArray.push(command);
          client.commands.set(command.name.toLowerCase(), command);
        } else {
          console.log(`[failed Command]  ${command.name.toLowerCase()}`);
        }
      });
    }
  });
  console.log(`-> [Loaded Commands]`);

  client.on("ready", (client) => {
    if (client.config.app.global) {
      client.application.commands.set(CommandsArray);
    } else {
      client.guilds.cache.get(process.env.GUILD).commands.set(CommandsArray);
    }
  });
}
