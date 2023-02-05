const { SlashCommandBuilder } = require("discord.js");
const { text } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Reveals all available commands and what they do."),
  async execute(interaction) {
    await interaction.reply({
      content: `${interaction.user} ${text.helpCommand}`,
      ephemeral: true,
    });
  },
};
