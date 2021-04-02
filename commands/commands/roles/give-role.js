module.exports = {
  commands: ["giverole", "賦予身分組"],
  minArgs: 2,
  expectedArgs: "<目標的 @> <身分組名稱>",
  permissions: "ADMINISTRATOR",
  description: "賦予該身分組",
  callback: (message, arguments) => {
    const targetUser = message.mentions.users.first();
    if (!targetUser) {
      message.reply("請指定目標人。");
      return;
    }

    arguments.shift();

    const roleName = arguments.join(" ");
    const { guild } = message;

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName;
    });
    if (!role) {
      message.reply(`沒有這個身分組-"${roleName}"`);
      return;
    }

    const member = guild.members.cache.get(targetUser.id);
    member.roles.add(role);

    message.reply(`該用戶現在賦予"${roleName}"角色`);
  },
};
