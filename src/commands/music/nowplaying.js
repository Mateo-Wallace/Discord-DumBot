const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "view what is playing!",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.nowplaying,

  execute({ inter, queue }) {
    if (!queue)
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
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

    const saveButton = new ButtonBuilder()
      .setLabel("Save this track")
      .setCustomId(JSON.stringify({ ffb: "savetrack" }))
      .setStyle("Danger");

    const volumeup = new ButtonBuilder()
      .setLabel("Volume up")
      .setCustomId(JSON.stringify({ ffb: "volumeup" }))
      .setStyle("Primary");

    const volumedown = new ButtonBuilder()
      .setLabel("Volume Down")
      .setCustomId(JSON.stringify({ ffb: "volumedown" }))
      .setStyle("Primary");

    const loop = new ButtonBuilder()
      .setLabel("Loop")
      .setCustomId(JSON.stringify({ ffb: "loop" }))
      .setStyle("Danger");

    const resumepause = new ButtonBuilder()
      .setLabel("Resume & Pause")
      .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
      .setStyle("Success");

    const row = new ActionRowBuilder().addComponents(
      volumedown,
      saveButton,
      resumepause,
      loop,
      volumeup
    );

    inter.reply({ embeds: [embed], components: [row] });
  },
};
