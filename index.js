import { Player } from 'discord-player';
import { DefaultExtractors } from '@discord-player/extractor';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import { loader } from './src/utils/loader.js';
import { events } from './src/utils/events.js';
import config from './config.js';

// Load environment variables
dotenv.config();

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: 'everyone',
});

client.config = config;

const player = new Player(client, client.config.opt.discordPlayer);

await player.extractors.loadMulti(DefaultExtractors);
await player.extractors.register(YoutubeiExtractor, {});

loader();
events();

client.login(process.env.TOKEN);

// Prevent crash on unhandled promise rejection
process.on('unhandledRejection', (reason) => console.error(reason));
// Prevent crash on uncaught exception
process.on('uncaughtException', (error) => console.error(error));
// Log warning
process.on('warning', (warning) => console.error(warning));
