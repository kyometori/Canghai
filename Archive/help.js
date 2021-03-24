const Discord = require("discord.js");
module.exports = {
  commands: ["幫助", "help"],
  minArgs: 0,
  maxArgs: 0,
  callback: (message) => {
    const embed = new Discord.MessageEmbed()
      .setColor("#66f5fd")
      .setTitle("插件指令")
      .setTimestamp()
      .setThumbnail("https://ppt.cc/fLWcMx")
      .addFields(
        {
          name: "前綴",
          value: "as@",
        },
        {
          name: "ping,test",
          value: "pong",
          inline: true,
        },
        {
          name: "as@成員數量",
          value: "該群成員數量",
          inline: true,
        },
        {
          name: "as@伺服器信息",
          value: "該群伺服器信息",
          inline: true,
        }
      )
      .setDescription("**會持續增加**");
    message.channel.send(embed);
  },
};
