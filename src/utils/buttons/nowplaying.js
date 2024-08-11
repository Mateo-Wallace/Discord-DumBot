// actual functionality is in repeatFunctions
const nowPlaying = require("../repeatFunctions/nowplaying");

module.exports = async ({ inter, queue }) => {
  const isButton = true;
  nowPlaying(inter, queue, isButton);
};
