export default {
  name: 'stop',
  description: 'Stop the track',
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.stop,

  async execute({ inter, queue }) {
    try {
      queue.delete();

      await inter.reply({
        content: 'Music stopped in this server, see you next time ✅',
      });
    } catch {
      await inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }
  },
};
