export default {
  name: 'resume',
  description: 'Resume the currently paused track',
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.resume,

  async execute({ inter, queue }) {
    if (!queue) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (!queue.node.isPaused()) {
      return inter.reply({
        content: `The track is already running, ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    const success = queue.node.resume();

    return inter.reply({
      content: success
        ? `Current music ${queue.currentTrack.title} resumed ✅`
        : `Something went wrong ${inter.member}... try again? ❌`,
    });
  },
};
