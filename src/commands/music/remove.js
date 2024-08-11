const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "remove",
  description: "remove a song from the queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to remove",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "the place in the queue the song is in",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.remove,

  async execute({ inter, queue }) {
    const number = inter.options.getNumber("number");
    const track = inter.options.getString("song");

    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    if (!track && !number)
      inter.reply({
        content: `You have to use one of the options to remove a song ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (track) {
      for (let song of queue.tracks.data) {
        if (song.title === track || song.url === track) {
          queue.node.remove(song);
          return inter.reply({ content: `removed ${track} from the queue ✅` });
        }
      }

      return inter.reply({
        content: `could not find ${track} ${inter.member}... try using the url or the full name of the song ? ❌`,
        ephemeral: true,
      });
    }

    if (number) {
      const index = number - 1;
      const trackname = queue.tracks.data[index].title;

      if (!trackname)
        return inter.reply({
          content: `This track dose not seem to exist ${inter.member}...  try again ?❌`,
          ephemeral: true,
        });

      queue.node.remove(index);

      return inter.reply({ content: `removed ${trackname} from the queue ✅` });
    }
  },
};
