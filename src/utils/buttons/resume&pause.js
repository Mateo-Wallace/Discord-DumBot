export default async ({ inter, queue }) => {
  if (!queue) {
    return inter.reply({
      content: 'No music currently playing... try again? ❌',
      ephemeral: true,
    });
  }

  queue.node.isPaused() ? queue.node.resume() : queue.node.pause();

  return inter.reply({
    content: `${queue.node.isPaused() ? 'Paused' : 'Resumed'} the playback.`,
    ephemeral: true,
  });
};
