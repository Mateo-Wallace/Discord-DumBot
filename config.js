module.exports = {
  app: {
    botName: `DumBot`, //if you want to use a different name i suggest turning off the DumBot command below in enabledCommands. also edit the help description below to your new bots name.
    global: 0, //determines if bot works in all servers or just 1 server
    playing: "/help",
    doubleSongError: 0, //discord-player has an issue with skipping two songs. I've handled this by making it so when a song end the player loads the next song in queue a second time. If discord-player resolves this issue and you begin getting double songs in your queue simply turn this on.
  },

  opt: {
    DJ: {
      enabled: false, //if true only people with the role `roleName` can use the specified commands
      roleName: "DJ", //the name people need to have to use specified commands
      commands: [], //the commands only specified people can use. Format like this ["stop", "play", "queue"]
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
    helpDescription: `DumBot's code can be found at [Mateo-Wallace/DumBot](https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2) :smiling_face_with_3_hearts:\nDumBot is open source and ready for you to host yourself! \n For a full description of each command you can go to the [DumDocs](https://mateo-wallace.github.io/MP2-Discord-DumBot-V2/documentation/commands/)`,
    helpCommandList: 1, //1 is short help command, 0 is long detailed help command
    simpleCustomCommandName: `custom`, //all lowercase
    simpleCustomCommandMessage: `This is a custom command for you to edit. In order to enable go to config.js and go to enabled commands. Switch 'custom' from a 0 to a 1`,
  },

  // determines which commands the bot loads
  enabledCommands: {
    enableAll: 0, //overrides everything else in enabled commands and allows all commands

    // custom commands
    custom: 0,
    //ADD YOUR COMMANDS HERE

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
