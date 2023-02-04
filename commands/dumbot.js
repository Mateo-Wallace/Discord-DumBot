const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dumbot")
    .setDescription("Replies with a dumb message"),
  async execute(interaction) {
    await interaction.reply(`@${interaction.user.username} \nHello I am **DumBot V2**. I am very dumb.`);
  },
};
