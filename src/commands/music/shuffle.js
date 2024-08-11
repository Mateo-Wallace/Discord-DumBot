module.exports = {
  name: "shuffle",
  description: "shuffle the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.shuffle,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (queue.isEmpty())
      return inter.reply({
        content: `No music in the queue after the current one ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const mode = queue.toggleShuffle();

    return inter.reply({
      content: `${mode ? "Enabled" : "Disabled"} shuffle mode.`,
    });
  },
};
