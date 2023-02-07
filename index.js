const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});

client.config = require("./config");

global.player = new Player(client, client.config.opt.discordPlayer);

require("./src/utils/loader");
require("./src/utils/events");

client.login(process.env.TOKEN);

