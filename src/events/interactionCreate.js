import { EmbedBuilder, InteractionType } from 'discord.js';
import { useQueue } from 'discord-player';

export default (client, inter) => {
  const queue = useQueue(inter.guildId);

  if (inter.type === InteractionType.ApplicationCommand) {
    const DJ = client.config.opt.DJ;
    const command = client.commands.get(inter.commandName);

    if (!command) {
      inter.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('❌ | Error! Please contact Developers!'),
        ],
        flags: 64,
      });
      client.slash.delete(inter.commandName);
      return;
    }

    if (
      command.permissions &&
      !inter.member.permissions.has(command.permissions)
    ) {
      return inter.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(
              '❌ | You do not have the proper permissions to execute this command',
            ),
        ],
        flags: 64,
      });
    }

    if (
      DJ.enabled &&
      DJ.commands.includes(command.name) &&
      !inter.member._roles.includes(
        inter.guild.roles.cache.find((role) => role.name === DJ.roleName)?.id,
      )
    ) {
      return inter.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(
              `❌ | This command is reserved for members with \`${DJ.roleName}\``,
            ),
        ],
        flags: 64,
      });
    }

    if (command.voiceChannel) {
      if (!inter.member.voice.channel) {
        return inter.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ | You are not in a Voice Channel'),
          ],
          flags: 64,
        });
      }

      if (
        inter.guild.members.me.voice.channel &&
        inter.member.voice.channel.id !==
          inter.guild.members.me.voice.channel.id
      ) {
        return inter.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription('❌ | You are not in the same Voice Channel'),
          ],
          flags: 64,
        });
      }
    }

    command.execute({ inter, client, queue });
  }

  if (inter.type === InteractionType.MessageComponent) {
    const customId = JSON.parse(inter.customId);
    const file_of_button = customId.ffb;

    if (file_of_button) {
      const buttonPath = `../utils/buttons/${file_of_button}.js`;
      import(buttonPath)
        .then((buttonModule) => {
          const button = buttonModule.default;
          if (button) {
            button({ client, inter, customId, queue });
          }
        })
        .catch((error) => {
          console.error(
            `Failed to import button module from path: ${buttonPath}`,
            error,
          );
        });
    }
  }
};
