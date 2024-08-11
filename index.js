const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");
const { YoutubeiExtractor } = require("discord-player-youtubei");
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

const registerExtractors = async () => {
  await player.extractors.register(YoutubeiExtractor, {
    authentication: process.env.YT_CREDENTIAL,
    streamOptions: {
      useClient: "ANDROID",
    },
  });

  await player.extractors.loadDefault((ext) => ext !== "YouTubeExtractor");
};
registerExtractors();

require("./src/utils/loader");
require("./src/utils/events");

client.login(process.env.TOKEN);

// prevent crash on unhandled promise rejection
process.on("unhandledRejection", (reason) => console.error(reason));
// prevent crash on uncaught exception
process.on("uncaughtException", (error) => console.error(error));
// log warning
process.on("warning", (warning) => console.error(warning));
