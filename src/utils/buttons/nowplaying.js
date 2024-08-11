const { EmbedBuilder } = require("discord.js");
module.exports = async ({ client, inter, queue }) => {
  if (!queue)
    return inter.reply({
      content: `No music currently playing... try again ? ❌`,
      ephemeral: true,
    });

  const track = queue.currentTrack;

  const methods = ["disabled", "track", "queue"];

  const timestamp = queue.node.getTimestamp();
  const trackDuration =
    timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;

  const embed = new EmbedBuilder()
    .setTitle(`:arrow_forward: ${track.title}`)
    .setURL(track.url)
    .setThumbnail(track.thumbnail)
    .addFields(
      {
        name: ":speaker: Volume",
        value: `\`${queue.filters._lastFiltersCache.volume}\``,
        inline: true,
      },
      {
        name: ":hourglass: Duration:",
        value: `\`${trackDuration}\``,
        inline: true,
      },
      {
        name: ":infinity: Loop mode:",
        value: `\`${methods[queue.repeatMode]}\``,
        inline: true,
      },
      { name: "Progress ", value: `${queue.node.createProgressBar()}` },
      { name: "Requested by ", value: `${track.requestedBy}` }
    )
    .setColor("Red");

  inter.reply({ embeds: [embed], ephemeral: true });
};
