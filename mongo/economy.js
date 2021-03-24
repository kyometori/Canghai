const mongo = require("./mongo");
const profileSchema = require("./profile-schema");

const coinsCache = {}; // { 'guildId-userId': coins }

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log("運行findOne和Update()");

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("結果：", result);

      coinsCache[`${guildId}-${userId}`] = result.coins;

      return result.coins;
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`];
  if (cachedValue) {
    return cachedValue;
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log("運行 findOne()");

      const result = await profileSchema.findOne({
        guildId,
        userId,
      });

      console.log("結果：", result);

      let coins = 0;
      if (result) {
        coins = result.coins;
      } else {
        console.log("插入文件");
        await new profileSchema({
          guildId,
          userId,
          coins,
        }).save();
      }

      coinsCache[`${guildId}-${userId}`] = coins;

      return coins;
    } finally {
      mongoose.connection.close();
    }
  });
};
