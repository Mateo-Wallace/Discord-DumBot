const { useHistory } = require("discord-player");

module.exports = {
  name: "clear",
  description: "clear all the music in the queue",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.clear,

  async execute({ inter, queue }) {
    const history = useHistory(inter.guildId);

    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (!queue.isEmpty()) queue.tracks.clear();
    if (!history.isEmpty()) history.clear();

    inter.reply(`The queue has just been cleared 🗑️`);
  },
};
