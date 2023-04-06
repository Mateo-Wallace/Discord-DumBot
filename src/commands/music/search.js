const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  name: "search",
  description: "search a track",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to search",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.search,

  async execute({ client, inter }) {
    const song = inter.options.getString("song");

    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return inter.reply({
        content: `No results found ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const queue = await player.createQueue(inter.guild, {
      metadata: inter.channel,
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
    const maxTracks = res.tracks.slice(0, 10);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: `Results for ${song}`,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setDescription(
        `${maxTracks
          .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
          .join("\n")}\n\nSelect choice between **1** and **${
          maxTracks.length
        }** or **cancel** ⬇️`
      );

    inter.reply({ embeds: [embed] });

    const collector = inter.channel.createMessageCollector({
      time: 15000,
      max: 1,
      errors: ["time"],
      filter: (m) => m.author.id === inter.member.id,
    });

    collector.on("collect", async (query) => {
      if (query.content.toLowerCase() === "cancel")
        return (
          inter.followUp({ content: `Search cancelled ✅`, ephemeral: true }),
          collector.stop()
        );

      const value = parseInt(query);
      if (!value || value <= 0 || value > maxTracks.length)
        return inter.followUp({
          content: `Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... try again ? ❌`,
          ephemeral: true,
        });

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(inter.member.voice.channel);
      } catch {
        await player.deleteQueue(inter.guildId);
        return inter.followUp({
          content: `I can't join the voice channel ${inter.member}... try again ? ❌`,
          ephemeral: true,
        });
      }

      queue.addTrack(res.tracks[query.content - 1]);

      if (!queue.playing) await queue.play();
      await inter.followUp(
        `Track ${res.tracks[query.content - 1].title} added in the queue ✅`
      );
    });

    collector.on("end", (msg, reason) => {
      if (reason === "time")
        return inter.followUp({
          content: `Search timed out ${inter.member}... try again ? ❌`,
          ephemeral: true,
        });
    });
  },
};
