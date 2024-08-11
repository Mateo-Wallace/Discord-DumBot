const maxVol = client.config.opt.maxVol;

module.exports = async ({ inter, queue }) => {
  if (!queue)
    return inter.reply({
      content: `No music currently playing ${inter.member}... try again ? ❌`,
      ephemeral: true,
    });

  const vol = Math.floor(queue.node.volume - 5);

  if (vol < 0)
    return inter.reply({
      content: `I can not move the volume down any more ${inter.member}... try again ? ❌`,
      ephemeral: true,
    });

  if (queue.node.volume === vol)
    return inter.reply({
      content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`,
      ephemeral: true,
    });

  const success = queue.node.setVolume(vol);

  return inter.reply({
    content: success
      ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`
      : `Something went wrong ${inter.member}... try again ? ❌`,
    ephemeral: true,
  });
};
