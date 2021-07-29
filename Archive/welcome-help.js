const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: ["help-welcome", "歡迎設定"],
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 0,
  maxArgs: 0,
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 歡迎指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹Set up🔹",
          value: "`as@setwelcome [content]`",
          inline: true,
        },
        {
          name: "🔹check🔹",
          value: "`as@simjoin`",
          inline: true,
        }
      );

    const ps = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 歡迎指令-注意事項",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .setDescription(
        "`as@setwelcome` Please enter it in the channel you want to send\n\nContent can be added\n<@> tag member\n<!> Discord tag"
      );
    message.channel.send(reply);
    message.channel.send(ps);
  },
  permissions: "ADMINISTRATOR",
};
