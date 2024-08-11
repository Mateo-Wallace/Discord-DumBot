const { useHistory } = require("discord-player");

module.exports = {
  name: "back",
  description: "Go back the song before",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.back,

  async execute({ inter, queue }) {
    const history = useHistory(inter.guildId);

    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (history.isEmpty())
      return inter.reply({
        content: `There was no music played before ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    await history.previous();

    inter.reply({ content: `Playing the **previous** track ✅` });
  },
};
