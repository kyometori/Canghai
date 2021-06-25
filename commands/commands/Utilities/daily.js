const mongo = require("@util/mongo");
const dailyRewardsSchema = require("@schemas/daily-rewards-schema");

// Array of member IDs who have claimed their daily rewards in the last 24 hours
// Resets every 5 minutes
let claimedCache = [];

const clearCache = () => {
  claimedCache = [];
  setTimeout(clearCache, 1000 * 60 * 5); // 5 minutes
};
clearCache();

const alreadyClaimed = "您今天已經簽到過了";

module.exports = {
  /*constructor(client) {
    super(client, {
      name: "daily",
      group: "economy",
      memberName: "daily",
      description: ,
    });
  }*/
  commands: "daily",
  description: "Claims daily rewards",
  callback: async (message) => {
    const { guild, member } = message;
    const { id } = member;

    if (claimedCache.includes(id)) {
      console.log("從緩存返回");
      message.reply(alreadyClaimed);
      return;
    }

    console.log("從mongo獲取");

    const obj = {
      guildId: guild.id,
      guildName: guild.name,
      userId: id,
    };

    await mongo().then(async (mongoose) => {
      try {
        const results = await dailyRewardsSchema.findOne(obj);

        console.log("RESULTS:", results);

        if (results) {
          const then = new Date(results.updatedAt).getTime();
          const now = new Date().getTime();

          const diffTime = Math.abs(now - then);
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays <= 1) {
            claimedCache.push(id);

            message.reply(alreadyClaimed);
            return;
          }
        }

        await dailyRewardsSchema.findOneAndUpdate(obj, obj, {
          upsert: true,
        });

        claimedCache.push(id);

        // TODO: Give the rewards
        message.reply("您已成功每日簽到！");
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
