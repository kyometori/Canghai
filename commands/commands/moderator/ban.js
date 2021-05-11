const { MessageEmbed } = require("discord.js");

module.exports = {
  commands: ["ban", "封鎖", "b"],
  expectedArgs: "<name> <banRason>",
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 1,
  maxArgs: 2,
  description: "封鎖該使用者(Ban this user)(使用as@封鎖也可以)",
  callback: (message, args) => {
    const { member, mentions } = message;

    const target =
      message.guild.member(message.mentions.members.first()) ||
      message.guild.members.cache.get(args[0]);

    let targetID = args.shift();
    if (targetID.startsWith("<@") && targetID.endsWith(">")) {
      targetID = targetID.slice(2, -1);
    }

    let banReason = args.join(" ");
    if (target) {
      const targetMemberID = message.guild.members.cache.get(targetID);
      const targetMember = message.guild.members.cache.get(target.id);
      if (!member) {
        return message.channel.send("please give a valid User").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      } else if (targetMemberID === "400275443854344192") {
        return message.channel.send("I can't ban my owner!").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      } else if (targetMemberID === message.author.id) {
        return message.channel.send("You can't ban your self").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      } else if (!targetMember.bannable) {
        return message.channel.send("I can't ban this user!").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      } else if (!target) {
        message.channel.send(`請指定要封鎖的人`);
      } else if (banReason) {
        targetMember.ban(banReason);
        const reason = new MessageEmbed()
          .setTitle(target.tag)
          .setDescription(``);
        message.channel.send(`已把${target}列入封鎖名單`);
      } else {
        banReason = "None";
        targetMember.ban(banReason);
        message.channel.send(`已把${target}列入封鎖名單`);
      }
    }
  },
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
};
