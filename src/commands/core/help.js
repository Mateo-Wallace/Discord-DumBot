import { EmbedBuilder } from 'discord.js';

export default {
  name: 'help',
  description: 'All the commands this bot has!',
  enabled: client.config.enabledCommands.help,

  execute({ client, inter }) {
    const musicCommands = client.commands.filter((x) => x.musicCommand);
    const coreCommands = client.commands.filter((x) => !x.musicCommand);

    const simpleList = [
      {
        name: `Enabled - ${client.commands.size}`,
        value: client.commands.map((x) => `\`/${x.name}\``).join(' | '),
      },
    ];
    const complexList = [
      {
        name: 'Music Commands',
        value: musicCommands
          .map((x) => `*/${x.name}* | \`${x.description}\``)
          .join(' \n '),
      },
      {
        name: 'Core Commands',
        value: coreCommands
          .map((x) => `*/${x.name}* | \`${x.description}\``)
          .join(' \n '),
      },
    ];
    const commandList = client.config.text.helpCommandList
      ? simpleList
      : complexList;

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setDescription(client.config.text.helpDescription)
      .addFields(commandList);

    inter.reply({ embeds: [embed], ephemeral: true });
  },
};
