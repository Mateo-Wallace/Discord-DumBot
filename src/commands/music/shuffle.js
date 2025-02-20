export default {
  name: 'shuffle',
  description: 'Shuffle the track',
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.shuffle,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    if (queue.isEmpty()) {
      return inter.reply({
        content: `No music in the queue after the current one ${inter.member}... try again? ❌`,
        flags: 64,
      });
    }

    const mode = queue.toggleShuffle();

    return inter.reply({
      content: `${mode ? 'Enabled' : 'Disabled'} shuffle mode.`,
    });
  },
};
