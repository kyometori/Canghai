const { MessageEmbed } = require("discord.js");
const icon =
  "https://cdn.discordapp.com/avatars/806555021340573756/4c4f310b1c556aeb8a059df6d8e1b917.png";
module.exports = {
  commands: "help-role",
  callback: (message) => {
    const reply = new MessageEmbed()
      .setAuthor(
        "【TW】克勞斯 身分組類指令",
        icon,
        "https://top.gg/servers/405916711930560523"
      )
      .setColor("#7289DA")
      .setFooter(`由${message.author.tag}輸入`)
      .setTimestamp()
      .addFields(
        {
          name: "🔹giverole🔹",
          value: "`as@giverole [name] [rolename]`",
          inline: true,
        },
        {
          name: "🔹hasrole🔹",
          value: "`as@hasrole [name] [rolename]`",
          inline: true,
        },
        {
          name: "🔹deleterole🔹",
          value: "`as@delrole [name] [rolename]`",
          inline: true,
        }
      );
    message.channel.send(reply);
  },
};
