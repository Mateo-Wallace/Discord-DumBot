module.exports = {
  app: {
    global: 1,
    playing: "/help",
    doubleSongError: 0, //discord-player has an issue with skipping two songs. I've handled this by making it so when a song end the player loads the next song in queue a second time. If discord-player resolves this issue and you begin getting double songs in your queue simply turn this on.
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "DJ",
      commands: [],
    },
    maxVol: 100,
    leaveOnEnd: 0, //determines if bot leaves voice after queue is finished
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
    helpCommandList: 0, //1 is short help command, 0 is long detailed help command
  },

  enabledCommands: {
    enableAll: 1, //overrides everything else in enabled commands and allows all commands

    // core commands
    dumbot: 1,
    help: 1,
    ping: 1,

    // dice commands
    hroll: 1,
    roll: 1,

    // music commands
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
