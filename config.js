// Bot Related Settings
const settings = {
  isGuild: 1, // boolean: determines if bot is running for all servers or just a dev server (otherwise known as a guild)
};

const text = {
    helpCommand: `has used the **/help** command! This is a list of all existing commands and what they do. \n 
    **/help** :arrow_right: shows a list of all commands 
    **/dumbot** :arrow_right: says a very simple message
    **/countdown** :arrow_right: countsdown a number of seconds that the user specifies`
}

module.exports = { settings, text };
