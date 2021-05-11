module.exports = {
  commands: ["clear","c"],
  expectedArgs: "<num>",
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 1,
  maxArgs: 1,
  description: "刪除指定數量訊息(Delete the specified number of messages)",
  callback: async (message, args) => {
    if (isNaN(args[0]))
      return message.reply("請輸入真實數字！").then((msg) => {
        msg.delete({ timeout: 5000 });
      });

    if (args[0] >= 100)
      return message.reply("您最多可以刪除99條消息！").then((msg) => {
        msg.delete({ timeout: 5000 });
      })

    if (args[0] <= 1)
      return message.reply("您必須刪除至少一條消息！").then((msg) => {
        msg.delete({ timeout: 5000 });
      })

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
        message.channel.send(`已刪除` + args[0] + `條信息`).then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      });
  },
  permissions: "ADMINISTRATOR",
};
