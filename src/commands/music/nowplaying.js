// actual functionality is in repeatFunctions
const nowPlaying = require("../../utils/repeatFunctions/nowplaying");

module.exports = {
  name: "nowplaying",
  description: "view what is playing!",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.nowplaying,

  execute({ inter, queue }) {
    const isButton = false;
    nowPlaying(inter, queue, isButton);
  },
};
