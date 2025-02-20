export default async (inter, queue) => {
  if (!queue || !queue.node.isPlaying()) {
    return inter.reply({
      content: 'No music currently playing... try again? ❌',
      flags: 64,
    });
  }

  if (queue.isEmpty()) {
    return inter.reply({
      content: `No next song to skip ${inter.member}... try again? ❌`,
      flags: 64,
    });
  }

  const success = queue.node.skip();

  return inter.reply({
    content: success
      ? `Current music ${queue.currentTrack.title} skipped ✅`
      : `Something went wrong ${inter.member}... try again? ❌`,
  });
};
