module.exports = {
  name: "stop",
  description: "stop the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.stop,

  execute({ inter }) {
    const queue = player.nodes.get(inter.guildId);

    try {
      queue.delete();

      inter.reply({
        content: `Music stopped in this server, see you next time ✅`,
      });
    } catch {
      inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }
  },
};
