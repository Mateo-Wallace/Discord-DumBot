import save from "../../utils/repeatFunctions/save.js";

export default {
  name: "save",
  description: "Save the current track!",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.save,

  async execute({ inter, queue }) {
    await save(inter, queue);
  },
};
