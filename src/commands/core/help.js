const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "All the commands this bot has!",
  coreHelp: true,

  execute({ client, inter }) {
    const musicCommands = client.commands.filter((x) => x.coreHelp !== true);
    const coreCommands = client.commands.filter((x) => x.coreHelp == true);

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setDescription(client.config.text.helpDescription)
      .addFields(
        client.config.text.helpCommandList
          ? [
              {
                name: `Enabled - ${client.commands.size}`,
                value: client.commands.map((x) => `\`${x.name}\``).join(" | "),
              },
            ]
          : [
              {
                name: `Music Commands`,
                value: musicCommands
                  .map((x) => `*${x.name}* | \`${x.description}\``)
                  .join(" \n "),
              },
              {
                name: `Core Commands `,
                value: coreCommands
                  .map((x) => `*${x.name}* | \`${x.description}\``)
                  .join(" \n "),
              },
            ]
      )
      .setFooter({ text: "Music code by ZerioDev/Music-bot" });

    inter.reply({ embeds: [embed], ephemeral: true });
  },
};
