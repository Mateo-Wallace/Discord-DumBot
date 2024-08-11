// actual functionality is in repeatFunctions
const skip = require("../repeatFunctions/skip");

module.exports = async ({ inter, queue }) => {
  skip(inter, queue);
};
