const { readdirSync } = require("fs");
const { join } = require("path");
const { Collection } = require("discord.js");

client.commands = new Collection();

// Compiles All Folders Within Commands
readdirSync("./src/commands").forEach((dirs) => {
  // Compiles All Files Within A Folder
  const commandFiles = readdirSync(`./src/commands/${dirs}`).filter((file) =>
    file.endsWith(".js")
  );

  // Loads All Commands
  for (const file of commandFiles) {
    const filePath = `../src/commands/${dirs}/${file}`;
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
});

// Compiles Events
const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(".js")
);

// Loads All Events
for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
