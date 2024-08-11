import back from "../../utils/repeatFunctions/back.js";

export default {
  name: "back",
  description: "Go back to the previous song",
  voiceChannel: true, // Requires user to be in a voice channel
  musicCommand: true, // Marks this command as music-related
  enabled: client.config.enabledCommands.back,

  async execute({ inter, queue }) {
    // Calls the 'back' function with interaction and queue
    await back(inter, queue);
  },
};
