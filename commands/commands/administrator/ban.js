module.exports = {
  commands: ["ban", "封鎖"],
  expectedArgs: "<name>",
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 1,
  maxArgs: 1,
  description: "封鎖該使用者(Ban this user)(使用as@封鎖也可以)",
  callback: (message) => {
    const { member, mentions } = message;

    const tag = `<@${member.id}>`;

    const target = mentions.users.first();
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      if (member.user.id === "400275443854344192")
        return message.channel.send("I can't ban my owner!").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      if (member.id === message.author.id)
        return message.channel.send("You can't ban your self").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      if (!member.bannable)
        return message.channel.send("I can't ban this user!").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      if (!target) {
        message.channel.send(`${tag} 請指定要封鎖的人`);
      } else {
        targetMember.ban();
        message.channel.send(`${tag},已把${target}列入封鎖名單`);
      }
    }
  },
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
};
