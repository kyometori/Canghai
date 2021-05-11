module.exports = {
  commands: ["botsupport", "supportserver", "serversupport", "botserver"],
  maxArgs: 0,
  description: "Provides the support server for the bot.",
  callback: (message) => {
    const supportServer = "https://discord.gg/szmDnMmhGx";
    return message
      .reply(`The support server for the discord bot is: ${supportServer}`)
      .then((msg) => {
        msg.delete({ timeout: 30000 });
      });
  },
};
