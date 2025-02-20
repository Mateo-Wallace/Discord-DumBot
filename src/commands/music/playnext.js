import { ApplicationCommandOptionType } from 'discord.js';
import { QueryType, useMainPlayer } from 'discord-player';

export default {
  name: 'playnext',
  description: 'Play a song next in the queue',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'The song you want to play next',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'source',
      description: 'The search engine you want to use.',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        {
          name: 'YouTube',
          value: QueryType.YOUTUBE_SEARCH,
        },
        {
          name: 'SoundCloud',
          value: QueryType.SOUNDCLOUD_SEARCH,
        },
        {
          name: 'Spotify',
          value: QueryType.SPOTIFY_SEARCH,
        },
        {
          name: 'Apple Music',
          value: QueryType.APPLE_MUSIC_SEARCH,
        },
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.playnext,

  async execute({ inter, queue }) {
    await inter.deferReply();

    if (!queue || !queue.node.isPlaying()) {
      return inter.editReply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    const song = inter.options.getString('song');
    let searchEngine = inter.options.getString('source', false);
    const urlRegex =
      /^(https?):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/;
    if (!searchEngine || urlRegex.test(song)) {
      searchEngine = QueryType.SPOTIFY_SEARCH;
    }

    if (client.config.app.noYoutube && searchEngine === 'youtubeSearch') {
      return inter.editReply({
        content: 'Youtube non functional at the moment. Sorry ❌',
        flags: 64,
      });
    }

    const player = useMainPlayer();

    const result = await player.search(song, {
      requestedBy: inter.member,
      searchEngine,
    });

    if (!result.hasTracks()) {
      return inter.editReply({
        content: `No results found ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (result.playlist) {
      return inter.editReply({
        content: `This command does not support playlists ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    queue.node.insert(result.tracks[0], 0);

    await inter.editReply({
      content: `Track ${result.tracks[0].title} has been inserted into the queue... it will play next 🎧`,
    });
  },
};
