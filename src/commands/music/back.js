// actual functionality is in repeatFunctions
const back = require("../../utils/repeatFunctions/back");

module.exports = {
  name: "back",
  description: "Go back the song before",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.back,

  async execute({ inter, queue }) {
    back(inter, queue);
  },
};
