const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: ["help-Reception", "歡迎設定"],
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 0,
  maxArgs: 0,
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 接待指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹歡迎設定🔹",
          value: "`as@setwelcome [內容]`",
          inline: true,
        },
        {
          name: "🔹歡迎關閉🔹",
          value: "`as@delwelcome`",
          inline: true,
        },
        {
          name: "🔹歡迎測試🔹",
          value: "`as@simjoin`",
          inline: true,
        },
        {
          name: "🔹離開設定🔹",
          value: "`as@setleave [內容]`",
          inline: true,
        },
        {
          name: "🔹離開關閉🔹",
          value: "`as@delleave`",
          inline: true,
        },
        {
          name: "🔹離開測試🔹",
          value: "`as@simleave`",
          inline: true,
        }
      );

    const ps = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 接待指令-注意事項",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .setDescription(
        "`as@setwelcome` 請在您要發送的頻道中輸入\n可以添加內容\n> <user> 提及該人\n> <tag> Discord標籤\n\n`as@setleave` 請在您要發送的頻道中輸入\n可以添加內容\n> <name> Discord 名稱\n> <tag> Discord 標籤"
      );
    message.channel.send(reply);
    message.channel.send(ps);
  },
  permissions: "ADMINISTRATOR",
};
