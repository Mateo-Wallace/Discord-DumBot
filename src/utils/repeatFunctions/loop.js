import { QueueRepeatMode } from 'discord-player';

export default async (inter, queue, repeatMode) => {
  if (!queue || !queue.node.isPlaying()) {
    return inter.reply({
      content: 'No music currently playing... try again? ❌',
      ephemeral: true,
    });
  }

  if (repeatMode === 0) {
    queue.setRepeatMode(QueueRepeatMode.TRACK);
  } else if (repeatMode === 1) {
    queue.setRepeatMode(QueueRepeatMode.QUEUE);
  } else if (repeatMode === 2) {
    queue.setRepeatMode(QueueRepeatMode.OFF);
  }

  const methods = ['disabled', 'track', 'queue'];
  return inter.reply({
    content: `Loop mode has been set to **${methods[queue.repeatMode]}**. ✅`,
  });
};
