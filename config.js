export default {
  app: {
    botName: 'DumBot', // If you want to use a different name, I suggest turning off the DumBot command below in enabledCommands. Also, edit the help description below to your new bot's name.
    global: 0, //determines if bot works in all servers or just 1 server
    playing: '/help',
    doubleSongError: 1, // Discord-player has an issue with skipping two songs. I've handled this by making it so when a song ends, the player loads the next song in queue a second time. If discord-player resolves this issue and you begin getting double songs in your queue, simply turn this on.
  },

  opt: {
    DJ: {
      enabled: false, // If true, only people with the role `roleName` can use the specified commands
      roleName: 'DJ', // The name people need to have to use specified commands
      commands: [], // The commands only specified people can use. Format like this: ["stop", "play", "queue"]
    },
    maxVol: 100,
    leaveOnEnd: 0, // Determines if the bot leaves voice after the queue is finished
    loopMessage: false,
    spotifyBridge: true,
    defaultvolume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
      },
    },
  },

  text: {
    helpDescription:
      // eslint-disable-next-line quotes
      "DumBot's code can be found at [Mateo-Wallace/DumBot](https://github.com/Mateo-Wallace/Discord-DumBot) :smiling_face_with_3_hearts:\nDumBot is open source and ready for you to host yourself! \n For a full description of each command, you can go to the [DumDocs](https://mateo-wallace.github.io/Discord-DumBot/documentation/commands/)",
    helpCommandList: 1, // 1 is short help command, 0 is long detailed help command
    simpleCustomCommandName: 'custom', // All lowercase
    simpleCustomCommandMessage:
      // eslint-disable-next-line quotes
      "This is a custom command for you to edit. In order to enable, go to config.js and go to enabled commands. Switch 'custom' from a 0 to a 1",
  },

  // Determines which commands the bot loads
  enabledCommands: {
    enableAll: 0, // Overrides everything else in enabled commands and allows all commands

    // Custom commands
    custom: 0,
    // ADD YOUR COMMANDS HERE

    // Core commands
    dumbot: 1,
    help: 1,
    ping: 1,

    // Dice commands
    hroll: 1,
    roll: 1,

    // Music commands
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
