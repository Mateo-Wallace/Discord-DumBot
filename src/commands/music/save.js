// actual functionality is in repeatFunctions
const save = require("../../utils/repeatFunctions/save");

module.exports = {
  name: "save",
  description: "save the current track!",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.save,

  async execute({ inter, queue }) {
    save(inter, queue);
  },
};
