import ms from 'ms';
import { ApplicationCommandOptionType } from 'discord.js';

export default {
  name: 'seek',
  description: 'Skip back or forward in a song',
  voiceChannel: true,
  options: [
    {
      name: 'time',
      description: 'Time that you want to skip to',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.seek,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    try {
      const timeToMS = ms(inter.options.getString('time'));
      if (timeToMS >= queue.currentTrack.durationMS) {
        return inter.reply({
          content: `The indicated time is higher than the total time of the current song ${inter.member}... try again? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`,
          flags: 64,
        });
      }

      await queue.node.seek(timeToMS);

      inter.reply({
        content: `Time set on the current song **${ms(timeToMS, {
          long: true,
        })}** ✅`,
      });
    } catch (e) {
      console.error(e);
      inter.reply({
        content: 'Something went wrong. Try again.',
        flags: 64,
      });
    }
  },
};
