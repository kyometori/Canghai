const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: ["help", "h", "幫助"],
  description: "描述該機器人的所有命令",
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setThumbnail(icon)
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹管理類🔹",
          value: "`as@help-moderator`",
          inline: true,
        },
        {
          name: "🔹經濟類🔹",
          value: "`as@help-economy`",
          inline: true,
        },
        {
          name: "🔹身分組類🔹",
          value: "`as@help-role`",
          inline: true,
        },
        {
          name: "🔹支持類🔹",
          value: "`as@help-support`",
          inline: true,
        },
        {
          name: "🔹娛樂類🔹",
          value: "`as@help-utilities`",
          inline: true,
        },
        {
          name: "🔹未分類🔹",
          value: "`as@help-info`",
          inline: true,
        },
        {
          name: "🔹新功能🔹",
          value: "`as@help-new`",
          inline: true,
        },
        {
          name: "🔹welcome🔹",
          value: "`as@help-welcome`",
          inline: true,
        },
        {
          name: "🔹leave🔹",
          value: "`as@help-leave`",
          inline: true,
        }
      );
    message.channel.send(reply);
  },
};
