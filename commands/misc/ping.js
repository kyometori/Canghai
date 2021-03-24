module.exports = {
  commands: ["ping", "test"],
  minArgs: 0,
  maxArgs: 0,
  description: "pong!",
  callback: (message) => {
    message.reply("Pong!");
  },
};
