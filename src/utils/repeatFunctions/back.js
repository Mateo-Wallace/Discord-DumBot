import { useHistory } from 'discord-player';

export default async (inter, queue) => {
  const history = useHistory(inter.guildId);

  if (!queue) {
    return inter.reply({
      content: `No music currently playing ${inter.member}... try again? ❌`,
      flags: 64,
    });
  }

  if (history.isEmpty()) {
    return inter.reply({
      content: `There was no music played before ${inter.member}... try again? ❌`,
      flags: 64,
    });
  }

  await history.previous();

  inter.reply({ content: 'Playing the **previous** track ✅' });
};
