const { QueueRepeatMode } = require("discord-player");

module.exports = async (inter, queue, repeatMode) => {
  if (!queue || !queue.node.isPlaying())
    return inter.reply({
      content: `No music currently playing... try again ? ❌`,
      ephemeral: true,
    });

  if (repeatMode === 0) queue.setRepeatMode(QueueRepeatMode.TRACK);

  if (repeatMode === 1) queue.setRepeatMode(QueueRepeatMode.QUEUE);

  if (repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF);

  const methods = ["disabled", "track", "queue"];
  return inter.reply({
    content: `loop made has been set to **${methods[queue.repeatMode]}**.✅`,
  });
};
