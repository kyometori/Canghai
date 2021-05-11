const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: "help-utilities",
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 娛樂類指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹add🔹",
          value: "`as@add [num1] [num2]`",
          inline: true,
        },
        {
          name: "🔹avatar🔹",
          value: "`as@hasrole [name]`",
          inline: true,
        },
        {
          name: "🔹choose🔹",
          value: "`as@delrole [Options1] | [Options2]`",
          inline: true,
        },
        {
          name: "🔹say🔹",
          value: "`as@say [channel] [content]`",
          inline: true,
        }
      );
    message.channel.send(reply);
  },
};
