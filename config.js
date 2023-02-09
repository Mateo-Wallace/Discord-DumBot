module.exports = {
  app: {
    global: 0,
    playing: "/help",
    doubleSongError: 0,
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "DJ",
      commands: [],
    },
    maxVol: 100,
    leaveOnEnd: 0,
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
    helpDescription: `DumBot's code can be found at [Mateo-Wallace/DumBot](https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2) :smiling_face_with_3_hearts:\nDumBot is open source and ready for you to host yourself! \n For a full description of each command you can go to the [DumDocs](https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2/blob/main/src/assets/documentation/Usage.md)`,
    helpCommandList: 0,
  },
};
