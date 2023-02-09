const wait = require("timers/promises").setTimeout;

module.exports = {
  name: "dumbot",
  description: "Replies with a dumb message",

  async execute({ inter }) {
    await inter.reply(
      `${inter.user} :wave: \nHello I am **DumBot**. I am very dumb.`
    );
    await wait(4000);
    await inter.editReply(
      `${inter.user} :man_bowing: \nI apologize for being so dumb.`
    );
    await wait(4000);
    await inter.editReply(
      `${inter.user} :blush: \nMy creator Mint made me this way.`
    );
    await wait(4000);
    await inter.editReply(
      `${inter.user} :heart: \nI'm just happy to be here and to have friends!`
    );
    await wait(4000);
    await inter.editReply(
      `${inter.user} :wave: \nHello I am **DumBot**. I am very dumb.`
    );
  },
};
