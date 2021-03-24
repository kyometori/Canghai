module.exports = {
  commands: ["servers", "成員數量"],
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 0,
  maxArgs: 0,
  description: "成員數量(servers)",
  callback: (message, client) => {
    client.guilds.cache.forEach((guild) => {
      //console.log(guild),
      message.channel.send(`${guild.name} 共有 ${guild.memberCount} 位成員`);
    });
  },
  permissions: "ADMINISTRATOR",
};
