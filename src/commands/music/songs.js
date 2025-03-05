import { QueryType, useMainPlayer, QueueRepeatMode } from 'discord-player';
import { ApplicationCommandOptionType } from 'discord.js';

import fs from 'fs';

function getFilesInFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => {
      const pathToFile = `${folderPath}/${file}`;
      return { name: file, value: pathToFile };
    });
  } catch (err) {
    console.error('Error reading folder:', err);
    return [];
  }
}

const folderPath = './src/utils/localSongs';
const filesArray = getFilesInFolder(folderPath);

export default {
  name: 'songs',
  description: 'Play a song!',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'The song you want to play',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: filesArray,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.play,

  async execute({ inter }) {
    await inter.deferReply();
    const query = inter.options.getString('song', true);
    const channel = inter.member?.voice?.channel;
    const player = useMainPlayer();
    const searchEngine = QueryType.FILE;

    const result = await player.search(query, {
      searchEngine,
      requestedBy: inter.user,
    });

    if (!result.hasTracks()) {
      return inter.editReply({
        content: `No results found ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    try {
      await player.play(channel, result, {
        nodeOptions: {
          metadata: { channel: inter.channel },
          volume: client.config.opt.defaultvolume,
          leaveOnEnd: client.config.opt.leaveOnEnd,
          repeatMode: QueueRepeatMode.OFF,
        },
        requestedBy: inter.user,
        connectionOptions: { deaf: true },
      });

      return inter.editReply({
        content: `Track ${result.tracks[0].title} added to the queue ✅`,
      });
    } catch (e) {
      console.error(e);
      return inter.editReply({
        content: `Something went wrong while playing \`${query}\``,
      });
    }
  },
};
