// actual functionality is in repeatFunctions
const back = require("../../utils/repeatFunctions/back");

module.exports = async ({ inter, queue }) => {
  back(inter, queue);
};
