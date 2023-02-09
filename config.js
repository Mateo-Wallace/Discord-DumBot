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

  enabledCommands: {
    enableAll: 0, //overrides everything else in enabled commands and allows all commands

    dumbot: 0,
    help: 1,
    ping: 1,

    hroll: 1,
    roll: 1,

    back: 1,
    clear: 1,
    controller: 1,
    filter: 1,
    jump: 1,
    loop: 1,
    nowplaying: 1,
    pause: 1,
    play: 1,
    playnext: 1,
    queue: 1,
    remove: 1,
    resume: 1,
    save: 1,
    search: 1,
    seek: 1,
    shuffle: 1,
    skip: 1,
    stop: 1,
    volume: 1,
  },
};
