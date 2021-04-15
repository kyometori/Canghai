module.exports = {
  commands: "創建文字頻道",
  expectedArgs: "<name>",
  minArgs: 1,
  maxArgs: 1,
  description: "",
  callback: (message) => {
    const name = message.content.replace("as@創建文字頻道 ", "");

    message.guild.channels
      .create(name, {
        type: "text",
      })
      .then((channel) => {
        //console.log(channel)
        const categoryId = "813290604985319464";
        channel.setParent(categoryId);
      });
  },
};
