const Discord = require("discord.js");
module.exports = {
  commands: ["serverinfo", "伺服器信息"],
  minArgs: 0,
  maxArgs: 0,
  description: "伺服器訊息(serverinfo)",
  callback: (message) => {
    const { guild } = message;

    const {
      name,
      region,
      memberCount,
      owner,
      id,
      createdAt,
      verificationLevel,
    } = guild;
    const icon = guild.iconURL();

    const embed = new Discord.MessageEmbed()
      .setTitle(`${name}－ 伺服器信息`)
      .setThumbnail(icon)
      .setColor("#66f5fd")
      .setTimestamp()
      .addFields(
        {
          name: "地區",
          value: region,
          inline: true,
        },
        {
          name: "總人數",
          value: memberCount,
          inline: true,
        },
        {
          name: "群主",
          value: owner.user.tag,
          inline: true,
        },
        {
          name: "伺服器id",
          value: id,
          inline: true,
        },
        {
          name: "創建時間",
          value: createdAt,
          inline: true,
        },
        {
          name: "驗證等級",
          value: verificationLevel,
          inline: true,
        }
      )
      .setFooter(由${message.author.tag}查詢`);

    message.channel.send(embed);
  },
};
