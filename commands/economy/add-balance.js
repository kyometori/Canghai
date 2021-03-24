const economy = require("../../mongo/economy");

module.exports = {
  commands: ["addbalance", "addbal"],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<目標的@> <硬幣數量>",
  permissionError: "您必須是管理員才能使用此命令。",
  description: "給予該使用者硬幣(Give the user coins)(使用as@addbal也可以)",
  permissions: "ADMINISTRATOR",
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first();

    if (!mention) {
      message.reply("請標記用戶以添加硬幣。");
      return;
    }

    const coins = arguments[1];
    if (isNaN(coins)) {
      message.reply("請提供有效數量的硬幣。");
      return;
    }

    const guildId = message.guild.id;
    const userId = mention.id;

    const newCoins = await economy.addCoins(guildId, userId, coins);

    message.reply(
      ` 您給了 <@${userId}> ,${coins}個硬幣. 他們現在有 ${newCoins} 個硬幣!`
    );
  },
};
