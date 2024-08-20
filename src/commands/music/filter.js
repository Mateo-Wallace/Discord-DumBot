import { ApplicationCommandOptionType } from 'discord.js';
import { AudioFilters } from 'discord-player';

export default {
  name: 'filter',
  description: 'Add a filter to your track',
  voiceChannel: true,
  options: [
    {
      name: 'filter',
      description: 'Filter you want to add',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        ...Object.keys(AudioFilters.filters)
          .map((filter) => ({ name: filter, value: filter }))
          .slice(0, 25),
      ],
    },
  ],
  musicCommand: true,
  enabled: client.config.enabledCommands.filter,

  async execute({ inter, queue }) {
    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again? ❌`,
        ephemeral: true,
      });
    }

    const { ffmpeg } = queue.filters;
    const activeFilter = ffmpeg.getFiltersEnabled()[0];
    const selectedFilter = inter.options.getString('filter');

    const availableFilters = [
      ...ffmpeg.getFiltersEnabled(),
      ...ffmpeg.getFiltersDisabled(),
    ];

    const filter = availableFilters.find(
      (f) => f.toLowerCase() === selectedFilter.toLowerCase(),
    );

    if (!filter) {
      return inter.reply({
        content: `This filter doesn't exist ${inter.member}... try again? ❌\n${
          activeFilter ? `Filter currently active: ${activeFilter}.\n` : ''
        }List of available filters: ${availableFilters
          .map((f) => `**${f}**`)
          .join(', ')}.`,
        ephemeral: true,
      });
    }

    const filtersToUpdate = {
      [filter]: !ffmpeg.getFiltersEnabled().includes(filter),
    };

    await ffmpeg.setFilters(filtersToUpdate);

    inter.reply({
      content: `The filter ${filter} is now **${
        ffmpeg.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'
      }** ✅\n*Reminder: the longer the music, the longer this will take.*`,
    });
  },
};
