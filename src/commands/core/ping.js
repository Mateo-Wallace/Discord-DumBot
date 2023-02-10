const ms = require("ms");

module.exports = {
  name: "ping",
  description: "Get the ping of the bot!",
  enabled: client.config.enabledCommands.ping,

  async execute({ client, inter }) {
    await inter.reply("Mathing...");
    inter.editReply(
      `${client.config.app.botName} is moving as fast as he can! :hourglass: \nLatency: ${Math.round(
        client.ws.ping
      )}ms, Last checked ${ms(
        Date.now() - client.ws.shards.first().lastPingTimestamp,
        { long: true }
      )} ago`
    );
  },
};
