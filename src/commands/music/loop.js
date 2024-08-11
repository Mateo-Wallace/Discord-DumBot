const { ApplicationCommandOptionType } = require("discord.js");
// actual functionality is in repeatFunctions
const loop = require("../../utils/repeatFunctions/loop");

module.exports = {
  name: "loop",
  description: "enable or disable looping of song's or the whole queue",
  voiceChannel: true,
  options: [
    {
      name: "action",
      description: "what action you want to preform on the loop",
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

  execute({ inter, queue }) {
    const repeatMode = inter.options.getNumber("action");
    loop(inter, queue, repeatMode);
  },
};
