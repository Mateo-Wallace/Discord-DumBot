// actual functionality is in repeatFunctions
import skip from "../../utils/repeatFunctions/skip.js";

export default {
  name: "skip",
  description: "Stop the track",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.skip,

  execute({ inter, queue }) {
    skip(inter, queue);
  },
};
