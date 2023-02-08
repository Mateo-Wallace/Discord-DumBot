module.exports = {
  app: {
    global: 0,
    playing: "/help",
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "DJ",
      commands: [],
    },
    maxVol: 100,
    leaveOnEnd: true,
    loopMessage: false,
    spotifyBridge: true,
    defaultvolume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },

  text: {
    helpCommand: `has used the **/help** command! This is a list of all existing commands and what they do. \n 
      **/help** :arrow_right: shows a list of all commands 
      **/dumbot** :arrow_right: says a very simple message
      **/countdown** :arrow_right: countsdown a number of seconds that the user specifies
      **/roll** :arrow_right: Rolls dice. Type in the format of 4d20 + 5 + ...
      **/hroll** :arrow_right: Rolls a hidden dice only visible to the user.`,
      githubRepo: `https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2`
  },
};
