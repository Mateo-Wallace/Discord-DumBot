const { ApplicationCommandOptionType } = require("discord.js");
const { diceLogic } = require("../../utils/utils");

module.exports = {
  name: "roll",
  description: "Rolls dice based on user input",
  options: [
    {
      name: "dice",
      description: "The amount and type of dice youd like to roll plus mods",
      type: ApplicationCommandOptionType.String,
    },
  ],

  execute({ inter }) {
    diceLogic(inter, false);
  },
};
