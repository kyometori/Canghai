const { MessageEmbed, User } = require("discord.js");

module.exports = {
  commands: "user",
  expectedArgs: "<@mention>",
  maxArgs: 1,
  description: "userinfo",
  callback: async (message) => {
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.author;
    const member = guild.members.cache.get(user.id);
    const avatar = user.displayAvatarURL({ dynamic: true });
    const guildjoin = new Date(member.joinedTimestamp).toLocaleDateString();
    const join = new Date(user.createdTimestamp).toLocaleDateString();
    const roles = member.roles.cache.size - 1;
    const nickname = member.nickname || "無";
    
    var statu = "上線";
    if (user.presence.status === "dnd") {
      var statu = "請勿打擾";
    } else if (user.presence.status === "idle") {
      var statu = "閒置";
    } else if (user.presence.status === "offline") {
      var statu = "下線";
    }

    const embed = new MessageEmbed()
      .setAuthor(`${user.username} － 個人資訊`, avatar)
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .setThumbnail(avatar)
      .addField(
        "公會訊息 ：",
        `> **暱稱** ： ${nickname}\n > **加入時間** ： ${guildjoin}\n > **身分組數量** ： ${roles}\n`,
        true
      )
      .addField(
        "使用者訊息 ：",
        `> **標籤** ： ${user.tag}\n > **ID** ： ${user.id}\n > **創建時間** ： ${join}\n > **狀態** ： ${statu}`,
        true
      )
      .setFooter(`由${message.author.tag}查詢`);
    message.channel.send(embed);
  },
};
