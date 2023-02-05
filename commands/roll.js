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
    const message = interaction.options.getString("dice");
    var messageWords = [];
    try {
      var array = message.split(" ");
      array.map((word) => {
        messageWords.push(word);
      });
    } catch {
      console.log(`No words`);
    }
    const rollFlavor = messageWords.slice(1).join(" ");

    if (messageWords.length === 0) {
      // /roll
      const sum = Math.floor(Math.random() * 20) + 1;
      await interaction.reply(
        `${interaction.user} :game_die: \n **Result**: 1d20(${
          sum == 1 || sum == 20 ? `**${sum}**` : sum
        }) \n **Total**: ${sum}`
      );
    } else {
      await interaction.reply("yada");
    }


  },
};
