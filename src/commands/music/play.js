const { QueryType, useMainPlayer } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "play",
  description: "play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.play,

  async execute({ inter }) {
    await inter.deferReply();
    const query = inter.options.getString("song");
    const channel = inter.member?.voice?.channel;
    const player = useMainPlayer();

    let searchEngine = inter.options.getString("source", false);
    const urlRegex =
      /^(https?):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/;
    if (!searchEngine || urlRegex.test(query)) searchEngine = QueryType.AUTO;

    const result = await player.search(query, {
      searchEngine,
      requestedBy: inter.user,
    });

    if (!result.hasTracks()) {
      return inter.editReply({
        content: `No results found`,
      });
    }

    try {
      const { queue, track, searchResult } = await player.play(
        channel,
        result,
        {
          nodeOptions: {
            metadata: { channel: inter.channel },
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
          },
          requestedBy: inter.user,
          connectionOptions: { deaf: true },
        }
      );

      return inter.editReply({
        content: "Added",
      });
    } catch (e) {
      console.error(e);
      return inter.editReply({
        content: "error",
      });
    }
  },
};
