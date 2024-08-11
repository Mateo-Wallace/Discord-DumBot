const { ApplicationCommandOptionType } = require("discord.js");
// actual functionality is in repeat functions
const roll = require("../../utils/repeatFunctions/roll");

module.exports = {
  name: "hroll",
  description: "Rolls hidden dice based on user input.",
  options: [
    {
      name: "dice",
      description: "The amount and type of dice you'd like to roll plus mods",
      type: ApplicationCommandOptionType.String,
    },
  ],
  enabled: client.config.enabledCommands.hroll,

  execute({ inter }) {
    roll(inter, true);
  },
};
