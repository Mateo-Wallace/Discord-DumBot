const ms = require("ms");

module.exports = {
  name: "ping",
  description: "Get the ping of the bot!",
  coreHelp: true,
  async execute({ client, inter }) {
    await inter.reply("Mathing...");
    inter.editReply(
      `DumBot is moving as fast as he can! :hourglass: \nLatency: ${Math.round(
        client.ws.ping
      )}ms, Last checked ${ms(
        Date.now() - client.ws.shards.first().lastPingTimestamp,
        { long: true }
      )} ago`
    );
  },
};
