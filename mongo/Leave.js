const mongo = require("./mongo");
const command = require("../command");
const leaveSchema = require("./Leave-schema");

module.exports = (client) => {
  //!setleave <message>
  const cache = {}; // guildId: [channelId, text]

  command(client, "setleave", async (message) => {
    const { member, channel, content, guild } = message;

    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("您沒有運行此命令的權限。");
      return;
    }

    let text = content;

    const split = text.split(" ");

    if (split.length < 2) {
      channel.send("請提供離開信息");
      return;
    }

    split.shift();
    text = split.join(" ");

    cache[guild.id] = [channel.id, text];

    await mongo().then(async (mongoose) => {
      try {
        await leaveSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            text,
          },
          {
            upsert: true,
          }
        );
      } finally {
        mongoose.connection.close();
      }
    });
  });

  const onleave = async (member) => {
    const { guild } = member;

    let data = cache[guild.id];

    if (!data) {
      console.log("從數據庫中獲取離開數據"+guild.id);

      await mongo().then(async (mongoose) => {
        try {
          const result = await leaveSchema.findOne({ _id: guild.id });

          cache[guild.id] = data = [result.channelId, result.text];
        } finally {
          mongoose.connection.close();
        }
      });
    }

    const channelId = data[0];
    const text = data[1];

    const channel = guild.channels.cache.get(channelId);
    channel.send(text.replace(/<@>/g, `${member.user.tag}`));
  };

  command(client, "simleave", (message) => {
    onleave(message.member);
  });

  client.on("guildMemberRemove", (member) => {
    onleave(member);
  });
};
