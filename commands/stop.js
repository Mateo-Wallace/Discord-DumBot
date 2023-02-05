const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops all bot functions, restart"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user} \nStopping.`
    );
  },
};