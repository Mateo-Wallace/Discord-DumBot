import { useHistory } from 'discord-player';

export default {
  name: 'clear',
  description: 'Clear all the music in the queue',
  voiceChannel: true, // Requires user to be in a voice channel
  musicCommand: true, // Marks this command as music-related
  enabled: client.config.enabledCommands.clear,

  async execute({ inter, queue }) {
    const history = useHistory(inter.guildId);

    if (!queue || !queue.node.isPlaying()) {
      return inter.reply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        flags: 64,
      });
    }

    if (!queue.isEmpty()) {
      queue.tracks.clear();
    }
    if (!history.isEmpty()) {
      history.clear();
    }

    inter.reply('The queue has just been cleared 🗑️');
  },
};
