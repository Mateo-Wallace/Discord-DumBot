import { ApplicationCommandOptionType } from "discord.js";

const maxVol = client.config.opt.maxVol;

export default {
  name: "volume",
  description: "Adjust the volume",
  voiceChannel: true,
  options: [
    {
      name: "volume",
      description: "The amount of volume",
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
      maxValue: maxVol,
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.volume,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying()) {
      return await inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }

    const vol = inter.options.getNumber("volume");

    if (queue.node.volume === vol) {
      return await inter.reply({
        content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    }

    const success = queue.node.setVolume(vol);

    return await inter.reply({
      content: success
        ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`
        : `Something went wrong ${inter.member}... try again ? ❌`,
    });
  },
};
