const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "jump",
  description: "Jumps to particular track in queue",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to jump to",
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
  enabled: client.config.enabledCommands.jump,

  async execute({ inter, queue }) {
    const track = inter.options.getString("song");
    const number = inter.options.getNumber("number");

    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    if (queue.isEmpty())
      return inter.reply({
        content: `No music in the queue after the current one ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    if (!track && !number)
      inter.reply({
        content: `You have to use one of the options to jump to a song ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (track) {
      for (let song of queue.tracks.data) {
        if (song.title === track || song.url === track) {
          queue.node.jump(song);
          return inter.reply({ content: `Jumped to ${track}  ✅` });
        }
      }
      return inter.reply({
        content: `could not find ${track} ${inter.member}... try using the url or the full name of the song ? ❌`,
        ephemeral: true,
      });
    }
    if (number) {
      const index = number - 1;
      const trackName = queue.tracks.data[index].title;
      if (!trackName)
        return inter.reply({
          content: `This track dose not seem to exist ${inter.member}...  try again ?❌`,
          ephemeral: true,
        });
      queue.node.jump(index);
      return inter.reply({ content: `Jumped to ${trackName}  ✅` });
    }
  },
};
