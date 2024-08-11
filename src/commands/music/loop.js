import { ApplicationCommandOptionType } from "discord.js";
import loop from "../../utils/repeatFunctions/loop.js";

export default {
  name: "loop",
  description: "Enable or disable looping of songs or the whole queue",
  voiceChannel: true,
  options: [
    {
      name: "action",
      description: "What action you want to perform on the loop",
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: [
        { name: "Disable", value: 2 },
        { name: "Song", value: 0 },
        { name: "Queue", value: 1 },
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.loop,

  async execute({ inter, queue }) {
    const repeatMode = inter.options.getNumber("action");
    await loop(inter, queue, repeatMode);
  },
};
