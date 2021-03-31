module.exports = {
  commands: ["ping", "延遲"],
  minArgs: 0,
  maxArgs: 0,
  description: "目前延遲查詢(Delayed Query)",
  callback: (message, arguments, text, client) => {
    message.reply("計算ping中...").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(
        `Bot 延遲: ${ping}ms, API 延遲: ${client.ws.ping}ms`
      );
    });
  },
};
