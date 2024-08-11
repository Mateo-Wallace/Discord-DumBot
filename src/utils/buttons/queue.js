// actual functionality is in repeatFunctions
const q = require("../repeatFunctions/queue");
module.exports = async ({ client, inter, queue }) => {
  q(client, inter, queue);
};
