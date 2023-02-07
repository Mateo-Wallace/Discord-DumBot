const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
require("dotenv").config();

client.commands = new Collection();
CommandsArray = [];

const events = readdirSync("./src/events/").filter((file) =>
  file.endsWith(".js")
);

console.log(`Loading events...`);

for (const file of events) {
  const event = require(`../src/events/${file}`);
  console.log(`-> [Loaded Event] ${file.split(".")[0]}`);
  client.on(file.split(".")[0], event.bind(null, client));
  delete require.cache[require.resolve(`../src/events/${file}`)];
}

console.log(`Loading commands...`);

readdirSync("./src/commands/").forEach((dirs) => {
  const commands = readdirSync(`./src/commands/${dirs}`).filter((files) =>
    files.endsWith(".js")
  );

  for (const file of commands) {
    const command = require(`../src/commands/${dirs}/${file}`);
    if (command.name && command.description) {
      CommandsArray.push(command);
      console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
      client.commands.set(command.name.toLowerCase(), command);
      delete require.cache[require.resolve(`../src/commands/${dirs}/${file}`)];
    } else console.log(`[failed Command]  ${command.name.toLowerCase()}`);
  }
});

client.on("ready", (client) => {
  if (client.config.app.global) client.application.commands.set(CommandsArray);
  else client.guilds.cache.get(process.env.GUILD).commands.set(CommandsArray);
});
