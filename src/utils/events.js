const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

player.on("error", (queue, error) => {
  console.log(`Error emitted from the queue ${error.message}`);
});

player.on("connectionError", (queue, error) => {
  console.log(`Error emitted from the connection ${error.message}`);
});

player.on("trackEnd", async (queue, track) => {
  if (!client.config.app.doubleSongError) {
    if (queue.tracks.length >= 1 && queue.tracks[0] !== track) {
      queue.insert(queue.tracks[0], 0);
    }
  }
});

player.on("pause", async (queue, track) => {});

player.on("trackStart", (queue, track) => {
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `Started playing ${track.title} in ${queue.connection.channel.name} 🎧`,
      iconURL: track.requestedBy.avatarURL(),
    })
    .setColor("#13f857");

  const back = new ButtonBuilder()
    .setLabel("Back")
    .setCustomId(JSON.stringify({ ffb: "back" }))
    .setStyle("Primary");

  const skip = new ButtonBuilder()
    .setLabel("Skip")
    .setCustomId(JSON.stringify({ ffb: "skip" }))
    .setStyle("Primary");

  const resumepause = new ButtonBuilder()
    .setLabel("Resume & Pause")
    .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
    .setStyle("Danger");

  const loop = new ButtonBuilder()
    .setLabel("Loop")
    .setCustomId(JSON.stringify({ ffb: "loop" }))
    .setStyle("Secondary");

  const queuebutton = new ButtonBuilder()
    .setLabel("Queue")
    .setCustomId(JSON.stringify({ ffb: "queue" }))
    .setStyle("Secondary");

  const row1 = new ActionRowBuilder().addComponents(
    back,
    loop,
    resumepause,
    queuebutton,
    skip
  );
  queue.metadata.send({ embeds: [embed], components: [row1] });
});

player.on("trackAdd", (queue, track) => {});

player.on("botDisconnect", (queue) => {
  queue.metadata.send(
    "I was manually disconnected from the voice channel, clearing queue... ❌"
  );
});

player.on("channelEmpty", (queue) => {
  queue.metadata.send(
    "Nobody is in the voice channel, leaving the voice channel... ❌"
  );
});

player.on("queueEnd", (queue) => {
  queue.metadata.send("I finished reading the whole queue ✅");
});

player.on("tracksAdd", (queue, tracks) => {
  queue.metadata.send(`All the songs in playlist added into the queue ✅`);
});

player.on("connectionCreate", (queue) => {
  queue.connection.voiceConnection.on("stateChange", (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");

    const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
      const newUdp = Reflect.get(newNetworkState, "udp");
      clearInterval(newUdp?.keepAliveInterval);
    };

    oldNetworking?.off("stateChange", networkStateChangeHandler);
    newNetworking?.on("stateChange", networkStateChangeHandler);
  });
});
