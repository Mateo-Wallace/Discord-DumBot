const { QueueRepeatMode } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "loop",
  description: "enable or disable looping of song's or the whole queue",
  voiceChannel: true,
  options: [
    {
      name: "action",
      description: "what action you want to preform on the loop",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "Queue", value: "enable_loop_queue" },
        { name: "Disable", value: "disable_loop" },
        { name: "Song", value: "enable_loop_song" },
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.loop,

  execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const methods = ["disabled", "track", "queue"];

    switch (inter.options._hoistedOptions.map((x) => x.value).toString()) {
      case "enable_loop_queue": {
        if (queue.repeatMode === 1)
          return inter.reply({
            content: `You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`,
            ephemeral: true,
          });

        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        const success = methods[queue.repeatMode] === "queue";

        return inter.reply({
          content: success
            ? `Repeat mode **enabled** the whole queue will be repeated endlessly 🔁`
            : `Something went wrong ${inter.member}... try again ? ❌`,
        });
        break;
      }
      case "disable_loop": {
        queue.setRepeatMode(QueueRepeatMode.OFF);
        const success = methods[queue.repeatMode] === "disabled";

        return inter.reply({
          content: success
            ? `Repeat mode **disabled**`
            : `Something went wrong ${inter.member}... try again ? ❌`,
        });
        break;
      }
      case "enable_loop_song": {
        if (queue.repeatMode === 2)
          return inter.reply({
            content: `You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`,
            ephemeral: true,
          });

        queue.setRepeatMode(QueueRepeatMode.TRACK);
        const success = methods[queue.repeatMode] === "track";

        return inter.reply({
          content: success
            ? `Repeat mode **enabled** the current song will be repeated endlessly (you can end the loop with /loop disable)`
            : `Something went wrong ${inter.member}... try again ? ❌`,
        });
        break;
      }
    }
  },
};
