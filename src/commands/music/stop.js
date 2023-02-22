module.exports = {
  name: "stop",
  description: "stop the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.stop,

  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    try {
      queue.destroy();

      inter.reply({
        content: `Music stopped intero this server, see you next time ✅`,
      });
    } catch {
      inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }
  },
};
