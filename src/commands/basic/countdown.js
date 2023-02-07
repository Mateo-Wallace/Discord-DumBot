const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Countsdown from the inputed number")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("The amount of seconds you would like to countdown")
        .setMaxValue(10)
        .setMinValue(0)
    ),
  async execute(interaction) {
    const timeLeft = interaction.options.getInteger("seconds");
    await interaction.reply(`${interaction.user} \nCountdown: ${timeLeft}`);
    var timeEdit = timeLeft - 1;

    var Timer = await setInterval(function () {
      interaction.editReply(`${interaction.user} \nCountdown: ${timeEdit}`);
      timeEdit -= 1;

      if (timeEdit <= -1) {
        clearInterval(Timer);
        interaction.editReply(`${interaction.user} \nTimes Up!`);
      }
    }, 1000);
  },
};
