import { ApplicationCommandOptionType } from 'discord.js';
import roll from '../../utils/repeatFunctions/roll.js';

export default {
  name: 'hroll',
  description: 'Rolls hidden dice based on user input.',
  options: [
    {
      name: 'dice',
      // eslint-disable-next-line quotes
      description: "The amount and type of dice you'd like to roll plus mods",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'message',
      description: 'A message you would like printed with your dice result',
      type: ApplicationCommandOptionType.String,
    },
  ],
  enabled: client.config.enabledCommands.hroll,

  async execute({ inter }) {
    await roll(inter, true);
  },
};
