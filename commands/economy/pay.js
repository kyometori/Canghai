const economy = require("../../mongo/economy");

module.exports = {
  commands: "pay",
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<要支付給的人 @> <硬幣數量>",
  description: "支付給其他使用者硬幣(Coins pay to other users)",
  callback: async (message, arguments, text) => {
    const { guild, member } = message;

    const target = message.mentions.users.first();
    if (!target) {
      message.reply("請指定要支付的人。");
      return;
    }

    const coinsToGive = arguments[1];
    if (isNaN(coinsToGive)) {
      message.reply("請提供有效數量的硬幣。");
      return;
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id);
    if (coinsOwned < coinsToGive) {
      message.reply(`本次支付需${coinsToGive}的硬幣!你餘額不足`);
      return;
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    );
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive);

    message.reply(
      `擬以支付給<@${target.id}>,${coinsToGive}個硬幣! 
      現在他有${newBalance} 個硬幣 AwA!
      你餘額剩 ${remainingCoins}~~QwQ~~!`
    );
  },
};
