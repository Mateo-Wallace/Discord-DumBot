const ms = require("ms");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "seek",
  description: "skip back or foward in a song",
  voiceChannel: true,
  options: [
    {
      name: "time",
      description: "time that you want to skip to",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.seek,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.reply}... try again ? ❌`,
        ephemeral: true,
      });

    try {
      const timeToMS = ms(inter.options.getString("time"));
      if (timeToMS >= queue.currentTrack.durationMS)
        return inter.reply({
          content: `The indicated time is higher than the total time of the current song ${inter.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`,
          ephemeral: true,
        });

      await queue.node.seek(timeToMS);

      inter.reply({
        content: `Time set on the current song **${ms(timeToMS, {
          long: true,
        })}** ✅`,
      });
    } catch (e) {
      console.log(e);
      inter.reply({
        content: `Something went wrong. Try again.`,
        ephemeral: true,
      });
    }
  },
};
