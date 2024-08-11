import { QueryType, useMainPlayer, QueueRepeatMode } from "discord-player";
import { ApplicationCommandOptionType } from "discord.js";

export default {
  name: "play",
  description: "Play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "The song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "source",
      description: "The search engine you want to use.",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        {
          name: "YouTube",
          value: QueryType.YOUTUBE_SEARCH,
        },
        {
          name: "SoundCloud",
          value: QueryType.SOUNDCLOUD_SEARCH,
        },
        {
          name: "Spotify",
          value: QueryType.SPOTIFY_SEARCH,
        },
        {
          name: "Apple Music",
          value: QueryType.APPLE_MUSIC_SEARCH,
        },
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.play,

  async execute({ inter }) {
    await inter.deferReply();

    const query = inter.options.getString("song", true);
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
        content: `No results found ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

    try {
      const { queue } = await player.play(channel, result, {
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
