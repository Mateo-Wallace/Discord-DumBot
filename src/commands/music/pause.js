export default {
  name: 'pause',
  description: 'Pause the track',
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.pause,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (queue.node.isPaused()) {
      return inter.reply({
        content: `The track is currently paused, ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    const success = queue.node.pause();

    return inter.reply({
      content: success
        ? `Current music ${queue.currentTrack.title} paused ✅`
        : `Something went wrong ${inter.member}... try again? ❌`,
    });
  },
};
