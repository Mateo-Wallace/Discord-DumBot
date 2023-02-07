// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Create a new client instance
global.client = new Client({
  intents: [GatewayIntentBits.Guilds],
  disableMentions: "everyone",
});

// Loads commands and events
require("./src/loader");

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
