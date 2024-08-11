import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { QueryType, useMainPlayer, QueueRepeatMode } from "discord-player";

export default {
  name: "search",
  description: "Search for a track",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "The song you want to search",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "source",
      description: "The search engine you want to use",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: "YouTube", value: QueryType.YOUTUBE_SEARCH },
        { name: "SoundCloud", value: QueryType.SOUNDCLOUD_SEARCH },
        { name: "Spotify", value: QueryType.SPOTIFY_SEARCH },
        { name: "Apple Music", value: QueryType.APPLE_MUSIC_SEARCH },
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.search,

  async execute({ client, inter }) {
    const song = inter.options.getString("song");
    const channel = inter.member?.voice?.channel;
    const player = useMainPlayer();

    let searchEngine = inter.options.getString("source", false);
    const urlRegex =
      /^(https?):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/;
    if (!searchEngine || urlRegex.test(song)) searchEngine = QueryType.AUTO;

    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine,
    });

    if (!res.hasTracks()) {
      return inter.reply({
        content: `No results found ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

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
          .join("\n")}\n\nSelect a choice between **1** and **${
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
      if (query.content.toLowerCase() === "cancel") {
        return (
          inter.followUp({ content: `Search cancelled ✅`, ephemeral: true }),
          collector.stop()
        );
      }

      const value = parseInt(query.content);
      if (!value || value <= 0 || value > maxTracks.length) {
        return inter.followUp({
          content: `Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... try again? ❌`,
          ephemeral: true,
        });
      }

      collector.stop();

      try {
        const { queue, track } = await player.play(
          channel,
          res.tracks[value - 1],
          {
            nodeOptions: {
              metadata: { channel: inter.channel },
              volume: client.config.opt.defaultvolume,
              leaveOnEnd: client.config.opt.leaveOnEnd,
              repeatMode: QueueRepeatMode.OFF,
            },
            requestedBy: inter.user,
            connectionOptions: { deaf: true },
          }
        );

        return inter.followUp({
          content: `Track ${res.tracks[value - 1].title} added to the queue ✅`,
        });
      } catch (e) {
        console.error(e);
        return inter.followUp({
          content: `Something went wrong while playing \`${query.content}\``,
        });
      }
    });

    collector.on("end", (msg, reason) => {
      if (reason === "time") {
        return inter.followUp({
          content: `Search timed out ${inter.member}... try again? ❌`,
          ephemeral: true,
        });
      }
    });
  },
};
