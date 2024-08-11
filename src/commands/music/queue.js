// actual functionality is in repeatFunctions
const q = require("../../utils/repeatFunctions/queue");

module.exports = {
  name: "queue",
  description: "Get the songs in the queue",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.queue,

  execute({ client, inter, queue }) {
    q(client, inter, queue);
  },
};
