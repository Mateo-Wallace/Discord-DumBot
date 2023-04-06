const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");
const playdl = require("play-dl");

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
    const song = inter.options.getString("song");
    if (song.includes("spotify"))
      return inter.editReply({
        content: `Spotify not supported ❌`,
        ephemeral: true,
      });

    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return inter.editReply({
        content: `No results found ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const queue = await player.createQueue(inter.guild, {
      metadata: inter.channel,
      spotifyBridge: client.config.opt.spotifyBridge,
      initialVolume: client.config.opt.defaultvolume,
      leaveOnEnd: client.config.opt.leaveOnEnd,

      async onBeforeCreateStream(track, source, _queue) {
        // only trap youtube source
        if (source === "youtube") {
          // track here would be youtube track
          return (
            await playdl.stream(track.url, { discordPlayerCompatibility: true })
          ).stream;
          // we must return readable stream or void (returning void means telling discord-player to look for default extractor)
        }
      },
    });

    try {
      if (!queue.connection) await queue.connect(inter.member.voice.channel);
    } catch {
      await player.deleteQueue(inter.guildId);
      return inter.editReply({
        content: `I can't join the voice channel ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }

    await inter.editReply({
      content: `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`,
    });

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
    if (!res.playlist)
      await inter.editReply({
        content: `Track ${res.tracks[0].title} added in the queue ✅`,
      });
  },
};
