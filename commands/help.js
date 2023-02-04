const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Reveals all available commands and what they do."),
  async execute(interaction) {
    await interaction.reply({
      content: `${interaction.user} has used the **/help** command! This is a list of all existing commands and what they do. \n 
      **/help** => shows a list of all commands 
      **/dumbot** => says a very simple message`,
      ephemeral: true,
    });
  },
};
