// actual functionality is in repeatFunctions
const skip = require("../../utils/repeatFunctions/skip");

module.exports = {
  name: "skip",
  description: "stop the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.skip,

  execute({ inter, queue }) {
    skip(inter, queue);
  },
};
