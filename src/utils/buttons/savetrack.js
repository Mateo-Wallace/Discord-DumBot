// actual functionality is in repeatFunctions
const save = require("../repeatFunctions/save");

module.exports = async ({ inter, queue }) => {
  save(inter, queue);
};
