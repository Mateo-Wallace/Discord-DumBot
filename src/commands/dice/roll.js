const { ApplicationCommandOptionType } = require("discord.js");
// actual functionality is in repeat functions
const roll = require("../../utils/repeatFunctions/roll");

module.exports = {
  name: "roll",
  description: "Rolls dice based on user input",
  options: [
    {
      name: "dice",
      description: "The amount and type of dice you'd like to roll plus mods",
      type: ApplicationCommandOptionType.String,
    },
  ],
  enabled: client.config.enabledCommands.roll,

  execute({ inter }) {
    roll(inter, false);
  },
};
