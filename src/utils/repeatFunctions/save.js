import { EmbedBuilder } from "discord.js";

export default async (inter, queue) => {
  if (!queue) {
    return inter.reply({
      content: `No music currently playing ${inter.member}... try again? ❌`,
      ephemeral: true,
    });
  }

  const track = queue.currentTrack;

  const timestamp = queue.node.getTimestamp();
  const trackDuration =
    timestamp.progress === "Infinity" ? "infinity (live)" : track.duration;

  inter.member
    .send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`:arrow_forward: ${track.title}`)
          .setURL(track.url)
          .setThumbnail(track.thumbnail)
          .addFields(
            {
              name: ":hourglass: Duration:",
              value: `\`${trackDuration}\``,
              inline: true,
            },
            {
              name: "Song by:",
              value: `\`${track.author}\``,
              inline: true,
            },
            { name: "Progress", value: `${queue.node.createProgressBar()}` },
            { name: "Requested by", value: `${track.requestedBy}` }
          )
          .setFooter({
            text: `from the server ${inter.member.guild.name}`,
            iconURL: inter.member.guild.iconURL({ dynamic: false }),
          })
          .setColor("Red"),
      ],
    })
    .then(() => {
      return inter.reply({
        content: `I have sent you the title of the music by private messages ✅`,
        ephemeral: true,
      });
    })
    .catch((error) => {
      console.error(error);
      return inter.reply({
        content: `Unable to send you a private message... try again? ❌`,
        ephemeral: true,
      });
    });
};
