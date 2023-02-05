const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls dice based on user input")
    .addStringOption((option) =>
      option
        .setName("dice")
        .setDescription(
          "The amount and type of dice youd like to roll plus mods"
        )
    ),
  async execute(interaction) {
    const timeLeft = interaction.options.getString("dice");
    await interaction.reply(`${interaction.user} \nCountdown: ${timeLeft}`);
  },
};
