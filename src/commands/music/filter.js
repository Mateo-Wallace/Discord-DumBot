const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "filter",
  description: "add a filter to your track",
  voiceChannel: true,
  options: [
    {
      name: "filter",
      description: "filter you want to add",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        ...Object.keys(require("discord-player").AudioFilters.filters)
          .map((m) => Object({ name: m, value: m }))
          .splice(0, 25),
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.filter,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying())
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });

    const ffmpeg = queue.filters.ffmpeg;

    const actualFilter = ffmpeg.getFiltersEnabled()[0];

    const infilter = inter.options.getString("filter");

    const filters = [];

    ffmpeg.getFiltersEnabled().map((x) => filters.push(x));
    ffmpeg.getFiltersDisabled().map((x) => filters.push(x));

    const filter = filters.find(
      (x) => x.toLowerCase() === infilter.toLowerCase()
    );

    if (!filter)
      return inter.reply({
        content: `This filter doesn't exist ${
          inter.member
        }... try again ? ❌\n${
          actualFilter ? `Filter currently active ${actualFilter}.\n` : ""
        }List of available filters ${filters
          .map((x) => `**${x}**`)
          .join(", ")}.`,
        ephemeral: true,
      });

    const filtersUpdated = {};

    filtersUpdated[filter] = ffmpeg.getFiltersEnabled().includes(filter)
      ? false
      : true;

    await ffmpeg.setFilters(filtersUpdated);

    inter.reply({
      content: `The filter ${filter} is now **${
        ffmpeg.getFiltersEnabled().includes(filter) ? "enabled" : "disabled"
      }** ✅\n*Reminder the longer the music is, the longer this will take.*`,
    });
  },
};
