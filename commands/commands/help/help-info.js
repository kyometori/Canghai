const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: "help-info",
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 未分類指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹ping🔹",
          value: "`as@ping`",
          inline: true,
        },
        {
          name: "🔹poll🔹",
          value: "`as@poll`",
          inline: true,
        },
        {
          name: "🔹serverinfo🔹",
          value: "`as@serverinfo`",
          inline: true,
        },
        {
          name: "🔹Userinfo🔹",
          value: "`as@user [name]`",
          inline: true,
        }
      );
    message.channel.send(reply);
  },
};
