const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dumbot")
    .setDescription("Replies with a dumb message"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user} \nHello I am **DumBot V2**. I am very dumb.`
    );
    await wait(4000);
    await interaction.editReply(
      `${interaction.user} \nI apologize for being so dumb.`
    );
    await wait(4000);
    await interaction.editReply(
      `${interaction.user} \nMy creator Mint made me this way.`
    );
    await wait(4000);
    await interaction.editReply(
      `${interaction.user} \nI'm just happy to be here and to have friends!`
    );
    await wait(4000);
    await interaction.reply(
      `${interaction.user} \nHello I am **DumBot V2**. I am very dumb.`
    );
  },
};
