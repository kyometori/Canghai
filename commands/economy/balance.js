const economy = require("../../mongo/economy");

module.exports = {
  commands: ["balance", "bal"],
  maxArgs: 1,
  expectedArgs: "<@用戶名>",
  description:
    "查詢該使用者硬幣數(Query the number of coins of the user)(使用as@bal也可以)",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author;
    const targetId = target.id;

    const guildId = message.guild.id;
    const userId = target.id;

    const coins = await economy.getCoins(guildId, userId);

    message.reply(`你擁有${coins}的代幣!`);
  },
};
