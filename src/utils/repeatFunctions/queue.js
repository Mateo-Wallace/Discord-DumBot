const { EmbedBuilder } = require("discord.js");

module.exports = async (client, inter, queue) => {
  if (!queue || !queue.node.isPlaying())
    return inter.reply({
      content: `No music currently playing ${inter.member}... try again ? ❌`,
      ephemeral: true,
    });

  const tracksData = queue.tracks.data;

  if (!tracksData[0])
    return inter.reply({
      content: `No music in the queue after the current one ${inter.member}... try again ? ❌`,
      ephemeral: true,
    });

  const methods = ["", "🔁", "🔂"];

  const songs = tracksData.length;

  const nextSongs =
    songs > 5
      ? `And **${songs - 5}** other song(s)...`
      : `In the playlist **${songs}** song(s)...`;

  const tracks = tracksData.map(
    (track, i) =>
      `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
        track.requestedBy.username
      })`
  );

  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
    .setAuthor({
      name: `Server queue - ${inter.guild.name} ${methods[queue.repeatMode]}`,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setDescription(
      `Current ${queue.currentTrack.title}\n\n${tracks
        .slice(0, 5)
        .join("\n")}\n\n${nextSongs}`
    );

  inter.reply({ embeds: [embed] });
};
