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
      let sides = messageWords[0]; // !roll 20
      let rolls = 1;
      if (!isNaN(messageWords[0][0] / 1) && messageWords[0].includes("d")) {
        // !roll 4d20
        rolls = messageWords[0].split("d")[0] / 1;
        sides = messageWords[0].split("d")[1];
      } else if (messageWords[0][0] == "d") {
        // !roll d20
        sides = sides.slice(1);
      }
      sides = sides / 1; // convert to number
      if (isNaN(sides) || isNaN(rolls)) {
        await interaction.reply(`Error executing ${interaction.commandName}`);
      } else {
        if (rolls > 1) {
          const rollResults = [];
          for (let i = 0; i < rolls; i++) {
            rollResults.push(Math.floor(Math.random() * sides) + 1);
          }
          const sum = rollResults.reduce((a, b) => a + b);
          return interaction.reply(
            `[${rollResults.toString()}] ${sum} ${rollFlavor}`
          );
        } else {
          return interaction.reply(
            Math.floor(Math.random() * sides) + 1 + " " + rollFlavor
          );
        }
      }
    }
  },
};
