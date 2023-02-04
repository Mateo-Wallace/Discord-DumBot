const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Countsdown from the inputed number")
    .addStringOption((option) =>
      option
        .setName("seconds")
        .setDescription("The amount of seconds you would like to countdown")
    ),
    async execute(interaction) {
        const input = interaction.options.getString('seconds');

        await interaction.reply(`Input was ${input}`)
    }
};
