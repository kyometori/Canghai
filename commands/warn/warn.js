const mongo = require("../../mongo/mongo");
const warnSchema = require("../../mongo/warn-schema");

module.exports = {
  commands: ["warn", "警告"],
  minArgs: 2,
  expectedArgs: "<目標的@> <原因>",
  permissions: "ADMINISTRATOR",
  callback: async (message, arguments) => {
    const target = message.mentions.users.first();
    if (!target) {
      message.reply("請指定要警告的人.");
      return;
    }

    arguments.shift();

    const guildId = message.guild.id;
    const userId = target.id;
    const reason = arguments.join(" ");

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    };

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        );
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
