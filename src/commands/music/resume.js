module.exports = {
  name: "resume",
  description: "play the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.resume,

  execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (queue.node.isPlaying())
      return inter.reply({
        content: `The track is already running, ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const success = queue.node.resume();

    return inter.reply({
      content: success
        ? `Current music ${queue.currentTrack.title} resumed ✅`
        : `Something went wrong ${inter.member}... try again ? ❌`,
    });
  },
};
