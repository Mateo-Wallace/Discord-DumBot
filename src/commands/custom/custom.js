// THIS IS AN EXAMPLE FILE FOR A CUSTOM COMMAND
// IF YOU NEED SOMETHING MORE COMPLEX I SUGGEST LEARNING SOME BASIC JAVASCRIPT

export default {
  // name is defined in config.js
  name: client.config.text.simpleCustomCommandName,
  description: 'Simple custom command',
  enabled: client.config.enabledCommands.custom,

  async execute({ inter }) {
    await inter.reply(
      // message is defined in config.js
      client.config.text.simpleCustomCommandMessage,
    );
  },
};
