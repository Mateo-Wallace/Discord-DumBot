import { ApplicationCommandOptionType } from 'discord.js';

export default {
  name: 'remove',
  description: 'Remove a song from the queue',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'The name/url of the track you want to remove',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'number',
      description: 'The position in the queue of the song to remove',
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.remove,

  async execute({ inter, queue }) {
    const number = inter.options.getNumber('number');
    const track = inter.options.getString('song');

    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (!track && !number) {
      return inter.reply({
        content: `You need to specify either a song name/url or a number to remove a song ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (track) {
      for (const song of queue.tracks.data) {
        if (song.title === track || song.url === track) {
          queue.node.remove(song);
          return inter.reply({ content: `Removed ${track} from the queue ✅` });
        }
      }

      return inter.reply({
        content: `Could not find ${track} ${inter.member}... try using the full name or URL of the song? ❌`,
        flags: 64,
      });
    }

    if (number) {
      const index = number - 1;
      const trackName = queue.tracks.data[index]?.title;

      if (!trackName) {
        return inter.reply({
          content: `This track does not seem to exist ${inter.member}... try again? ❌`,
          flags: 64,
        });
      }

      queue.node.remove(index);

      return inter.reply({ content: `Removed ${trackName} from the queue ✅` });
    }
  },
};
