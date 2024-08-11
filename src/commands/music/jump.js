import { ApplicationCommandOptionType } from "discord.js";

export default {
  name: "jump",
  description: "Jumps to a particular track in the queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "The name or URL of the track you want to jump to",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "The position in the queue of the track",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.jump,

  async execute({ inter, queue }) {
    const track = inter.options.getString("song");
    const number = inter.options.getNumber("number");

    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

    if (queue.isEmpty()) {
      return inter.reply({
        content: `No music in the queue after the current one ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

    if (!track && !number) {
      return inter.reply({
        content: `You need to provide either a song name/URL or a queue number ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

    if (track) {
      const song = queue.tracks.data.find(
        (s) => s.title === track || s.url === track
      );

      if (song) {
        queue.node.jump(song);
        return inter.reply({ content: `Jumped to ${track} ✅` });
      }

      return inter.reply({
        content: `Could not find ${track} ${inter.member}... try using the URL or full name of the song? ❌`,
        ephemeral: true,
      });
    }

    if (number) {
      const index = number - 1;
      const trackName = queue.tracks.data[index]?.title;

      if (!trackName) {
        return inter.reply({
          content: `This track does not seem to exist ${inter.member}... try again? ❌`,
          ephemeral: true,
        });
      }

      queue.node.jump(index);
      return inter.reply({ content: `Jumped to ${trackName} ✅` });
    }
  },
};
