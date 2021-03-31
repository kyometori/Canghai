const mongo = require("../../mongo/mongo");
const warnSchema = require("../../mongo/warn-schema");

module.exports = {
  commands: ["listwarnings", "lw"],
  minArgs: 1,
  expectedArgs: "<目標的 @>",
  permissions: "ADMINISTRATOR",
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first();
    if (!target) {
      message.reply("請指定要為其加載警告的用戶。");
      return;
    }

    const guildId = message.guild.id;
    const userId = target.id;

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        });

        let reply = `\n<@${userId}>警告的列表:\n\n`;

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning;

          reply += `日期 ${new Date(timestamp).toLocaleDateString()} \n`
          +`原因 "${reason}"\n`
          +`輸入警告者 ${author}\n\n`;
        }

        message.reply(reply);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
