import q from "../../utils/repeatFunctions/queue.js";

export default {
  name: "queue",
  description: "Get the songs in the queue",
  voiceChannel: true,
  musicCommand: true,
  enabled: client.config.enabledCommands.queue,

  async execute({ client, inter, queue }) {
    await q(client, inter, queue);
  },
};
