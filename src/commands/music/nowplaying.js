import nowPlaying from '../../utils/repeatFunctions/nowplaying.js';

export default {
  name: 'nowplaying',
  description: 'View what is playing!',
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.nowplaying,

  async execute({ inter, queue }) {
    const isButton = false;
    await nowPlaying(inter, queue, isButton);
  },
};
