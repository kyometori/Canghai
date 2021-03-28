module.exports = {
  commands: ["ping", "延遲"],
  minArgs: 0,
  maxArgs: 0,
  description: "目前延遲查詢(Delayed Query)",
  callback: (message) => {
    message.reply(`目前延遲 ${Date.now() - message.createdTimestamp} ms`);
  },
};
