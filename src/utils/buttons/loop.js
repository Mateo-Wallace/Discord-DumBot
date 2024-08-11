// actual functionality is in repeatFunctions
const loop = require("../repeatFunctions/loop");

module.exports = async ({ inter, queue }) => {
  const repeatMode = queue.repeatMode;
  loop(inter, queue, repeatMode);
};
