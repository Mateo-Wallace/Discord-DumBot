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
    helpDescription: `This code comes from a GitHub project [Mateo-Wallace/DumBot](https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2)\nDumBot is a Dice Rolling and Music Playing Bot.\nThe description for all commands are listed below.`,
    helpCommandList: 0,
  },
};
