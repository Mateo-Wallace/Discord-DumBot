import {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";

export default {
  name: "controller",
  description: "Set controller channel",
  voiceChannel: false,
  permissions: PermissionsBitField.Flags.ManageMessages,
  options: [
    {
      name: "channel",
      description: "The channel you want to send it to",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.controller,

  async execute({ inter }) {
    const channel = inter.options.getChannel("channel");

    if (channel.type !== 0) {
      return inter.reply({
        content: "You have to send it to a text channel.. ❌",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Control your music from the buttons below")
      .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
      .setColor("#36393e");

    await inter.reply({
      content: `Sending controller to ${channel}... ✅`,
      ephemeral: true,
    });

    const back = new ButtonBuilder()
      .setLabel("Back")
      .setCustomId(JSON.stringify({ ffb: "back" }))
      .setStyle("Primary");

    const skip = new ButtonBuilder()
      .setLabel("Skip")
      .setCustomId(JSON.stringify({ ffb: "skip" }))
      .setStyle("Primary");

    const resumepause = new ButtonBuilder()
      .setLabel("Resume & Pause")
      .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
      .setStyle("Danger");

    const save = new ButtonBuilder()
      .setLabel("Save")
      .setCustomId(JSON.stringify({ ffb: "savetrack" }))
      .setStyle("Success");

    const volumeup = new ButtonBuilder()
      .setLabel("Volume Up")
      .setCustomId(JSON.stringify({ ffb: "volumeup" }))
      .setStyle("Primary");

    const volumedown = new ButtonBuilder()
      .setLabel("Volume Down")
      .setCustomId(JSON.stringify({ ffb: "volumedown" }))
      .setStyle("Primary");

    const loop = new ButtonBuilder()
      .setLabel("Loop")
      .setCustomId(JSON.stringify({ ffb: "loop" }))
      .setStyle("Danger");

    const np = new ButtonBuilder()
      .setLabel("Now Playing")
      .setCustomId(JSON.stringify({ ffb: "nowplaying" }))
      .setStyle("Secondary");

    const queuebutton = new ButtonBuilder()
      .setLabel("Queue")
      .setCustomId(JSON.stringify({ ffb: "queue" }))
      .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
      back,
      queuebutton,
      resumepause,
      np,
      skip
    );
    const row2 = new ActionRowBuilder().addComponents(
      volumedown,
      loop,
      save,
      volumeup
    );

    await channel.send({ embeds: [embed], components: [row1, row2] });
  },
};
