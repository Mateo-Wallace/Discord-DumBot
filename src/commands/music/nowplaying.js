const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { GuildQueuePlayerNode } = require("discord-player");

module.exports = {
  name: "nowplaying",
  description: "view what is playing!",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.nowplaying,

  execute({ inter }) {
    const queue = player.nodes.get(inter.guildId);

    if (!queue)
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const track = queue.currentTrack;
    
    if (!track)
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const methods = ["disabled", "track", "queue"];

    const GuildQueue = new GuildQueuePlayerNode(queue);

    const timestamp = GuildQueue.getTimestamp();

    const trackDuration =
      timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;

    const progress = GuildQueue.createProgressBar();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: track.title,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setThumbnail(track.thumbnail)
      .setDescription(
        `Volume **${
          queue.volume
        }**%\nDuration **${trackDuration}**\nProgress ${progress}\nLoop mode **${
          methods[queue.repeatMode]
        }**\nSong URL: \`${track.url}\`\nRequested by ${track.requestedBy}`
      )
      .setColor("ff0000");

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
